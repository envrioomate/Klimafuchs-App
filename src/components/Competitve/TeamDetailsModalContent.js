import React, {Component, Fragment} from "react";
import {AsyncStorage, Image, ImageBackground, RefreshControl, View} from "react-native"
import {
    ActionSheet,
    Body,
    Button,
    Card,
    CardItem,
    Content,
    H1,
    H3,
    Icon,
    Left,
    Right,
    Spinner,
    Text
} from "native-base";
import material from "../../../native-base-theme/variables/material";
import {FSModalContentBase} from "../Common/FSModal";
import {Mutation, Query} from "react-apollo";
import {
    ACCEPT_INVITE,
    CONFIRM_MEMBER,
    DEL_USER,
    GET_MY_TEAM,
    GET_TEAM,
    LEAVE_TEAM,
    MOD_USER,
    MY_MEMBERSHIPS, REJECT_INVITE,
    TeamSize,
    UNMOD_USER
} from "../../network/Teams.gql";
import {Util} from "../../util";
import {MaterialDialog} from "react-native-material-dialog";
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";
import {LinearGradient} from "expo-linear-gradient";
import * as env from "../../../env";

export class TeamDetailsModalContent extends FSModalContentBase {

    state = {
        uId: -1,
    };

    async componentWillMount() {
        let uId = await AsyncStorage.getItem('uId');
        this.setState({uId});
    }

    getOwnStatus = (members, currentTeamId) => {
        let {uId} = this.state;
        let myMembership = members.filter((membership) => membership.user.id == uId)[0];
        if (!myMembership) {
            console.log(members, myMembership, uId)
        }
        return {...myMembership, teamId: currentTeamId};
    };

    cardContent = (team, myMembership, refetch, editMode, requestModalClose, loading, standalone) => {
        let showUsers = team.closed ? (myMembership && myMembership.isActive) : true;
        let showRequests = myMembership && myMembership.isAdmin && !standalone;
        let isInvite = myMembership ? !myMembership.isAccepted : false;

        let teamSize = team.members.filter(m => m.isActive).length

        const teamAvatarUrl =
            team.avatar
                ? `${env.dev.API_IMG_URL}${team.avatar.filename}`
                : `${env.dev.API_IMG_URL}image_select.png`;

        return (
            <Fragment>
                <Content style={{width: '100%'}}
                         refreshControl={<RefreshControl
                             refreshing={this.state.refreshing || loading}
                             onRefresh={() => refetch()}
                         />}>
                    <View first style={{margin: 0, padding: 0, width: '100%', height: 200}}>
                        <ImageBackground source={{uri: teamAvatarUrl}}
                                         style={{margin: 0, padding: 0, width: '100%', height: '100%'}}>

                        </ImageBackground>

                    </View>
                    <CardItem>
                        <Text>{team.description}</Text>
                    </CardItem>
                    <CardItem>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row'
                        }}><Text>Rang: </Text><Text>{team.place === -1 ? 'Nicht Plaziert' : team.place}</Text></View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row'
                            }}><Text>{L.get("team_details_team_score_label")}: </Text><Text>{team.scorePerUser.toFixed(0)}</Text></View>
                    </CardItem>
                    <CardItem>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',

                        }}>
                            <Text>{L.get("team_details_team_size_label")}: {teamSize}</Text>
                        </View>
                    </CardItem>
                    {showUsers &&
                    <Fragment>
                        <CardItem style={{width: '100%', backgroundColor: '#ECECEC'}}>
                            <Text>Teammitgileder</Text>
                        </CardItem>

                        {this.renderAdmins(team.members, myMembership, editMode, refetch)}
                        <CardItem style={{width: '100%', backgroundColor: '#ECECEC'}}/>
                        {this.renderUsers(team.members, myMembership, editMode, refetch)}
                        {editMode && !isInvite &&
                        <Fragment>
                            <CardItem style={{width: '100%', backgroundColor: '#ECECEC'}}/>
                            {this.renderJoinRequests(team.members, myMembership, editMode, refetch)}
                            {editMode && <CardItem style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                width: '100%',
                                backgroundColor: '#ECECEC'
                            }}>
                                <Button primary onPress={() => {
                                    requestModalClose();
                                    editMode(team.id, true)
                                }}>
                                    <Text>{L.get("create_team_view_invite_view_title")}</Text>
                                </Button>
                            </CardItem>}

                        </Fragment>
                        }
                    </Fragment>
                    }
                    {isInvite && <CardItem style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        backgroundColor: '#ECECEC'
                    }}>
                        <Mutation mutation={REJECT_INVITE} refetchQueries={[{query: MY_MEMBERSHIPS}]}>
                            {(rejectInvite, {data, loading, error}) => (
                                <Button primary onPress={() => {
                                    requestModalClose();
                                    rejectInvite({
                                        variables: {
                                            membershipId: myMembership.id
                                        }
                                    })
                                }}>
                                    <Text>{L.get("team_details_decline_invite")}</Text>
                                </Button>
                            )}
                        </Mutation>
                        <Mutation mutation={ACCEPT_INVITE} refetchQueries={[{query: MY_MEMBERSHIPS}]}>
                            {(acceptInvite, {data, loading, error}) => (
                                <Button primary onPress={() => {
                                    requestModalClose();
                                    acceptInvite({
                                        variables: {
                                            membershipId: myMembership.id
                                        }
                                    })
                                }}>
                                    <Text>{L.get("team_details_accept_invite")}</Text>
                                </Button>
                            )}
                        </Mutation>

                    </CardItem>}

                </Content>
            </Fragment>

        )
    };

    renderAdmins = (members, myMembership, editMode, refetch) => {
        const admins = members.filter(member => member.isAdmin);
        return (
            <Fragment>
                {admins.map(user => {
                    return <UserRow key={user.id} member={user} ownStatus={myMembership} editMode={editMode}
                                    refetch={refetch}/>
                })}
            </Fragment>
        )
    };

    renderUsers = (members, myMembership, editMode, refetch) => {
        const users = members.filter(member => !member.isAdmin && member.isActive);
        return (
            <Fragment>
                {users.map(user => {
                    return <UserRow key={user.id} member={user} ownStatus={myMembership} editMode={editMode}
                                    refetch={refetch}/>

                })}
            </Fragment>
        )
    };

    renderJoinRequests = (members, myMembership, editMode, refetch) => {
        const users = members.filter(member => !member.isAdmin && !member.isActive);
        return (
            <Fragment>
                {users.map(user => {
                    return <UserRow key={user.id} member={user} ownStatus={myMembership} editMode={editMode}
                                    refetch={refetch}/>
                })}
            </Fragment>
        )
    };

    renderPlaceholder = (requestModalClose) => <Card style={{
        margin: '10%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: material.containerBgColor,
    }}
    >

        <CardItem header style={
            {
                backgroundColor: material.brandInfo,
            }}>
            <Button transparent dark onPress={() => requestModalClose()}>
                <Icon style={{fontSize: 30}} name="close"/>
            </Button>
        </CardItem>
        <CardItem>
            <Spinner/>
        </CardItem>
    </Card>;

    render() {
        let {requestModalClose, teamId, editMode, standalone} = this.props;
        if (this.state.uId < 0) return this.renderPlaceholder(requestModalClose);

        return (
            <Query query={GET_TEAM} variables={{
                teamId
            }}>
                {({loading, error, data, refetch}) => {
                    if (loading) return this.renderPlaceholder(requestModalClose);
                    const ownStatus = this.getOwnStatus(data.getTeam.members,teamId);
                    return (
                        <Card transparent={standalone} style={{
                            margin: '10%',
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            backgroundColor: material.containerBgColor,
                        }}
                        >
                            {standalone ? <CardItem>
                                    <Left>
                                        <H1>
                                            {data ? data.getTeam.name : 'error'}
                                        </H1>
                                    </Left>
                                    <Right>
                                        {editMode && <Button style={{right: 0}} info onPress={() => {
                                            requestModalClose();
                                            editMode(teamId, false, data.getTeam)
                                        }}>
                                            <Icon style={{color: material.brandLight}} name="md-create"/>
                                            <Text>{L.get("teams_screen_edit_team_button_label")}</Text>
                                        </Button>}
                                    </Right>
                                </CardItem>
                                : <CardItem header style={
                                    {
                                        backgroundColor: (ownStatus && ownStatus.isActive) ? material.brandInfo : material.brandPrimary,
                                    }}>
                                    <Button transparent dark onPress={() => requestModalClose()}>
                                        <Icon style={{fontSize: 30}} name="close"/>
                                    </Button>
                                    <H3 style={{
                                        color: 'white',
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'stretch',
                                        marginLeft: 10,

                                    }}>{data ? data.getTeam.name : 'error'}</H3>
                                </CardItem>}

                            {error ?
                                <Content><Text>{JSON.stringify(error)}</Text></Content>
                                : this.cardContent(data.getTeam, ownStatus, refetch, editMode, requestModalClose, loading)
                            }


                        </Card>
                    )
                }}
            </Query>
        )
    };
}

class UserRow extends Component {

    state = {
        showAddUserDialog: false,
        showRemoveUserDialog: false,
        showDeclineUserDialog: false,
        showMakeAdminDialog: false,
        showDemoteAdminDialog: false,
        showLeaveTeamDialog: false
    };

    overflowUserActionsConfig = {
        config:
            {
                options: [
                    {text: "Zum Admin befördern", icon: "md-alert", iconColor: "#444"},
                    {text: "Entfernen", icon: "md-alert", iconColor: "#444"},
                    {text: "Abbrechen", icon: "close", iconColor: "#25de5b"}
                ],
                cancelButtonIndex: 2,
                destructiveButtonIndex: 1,
            },
        callback: (buttonIndex) => {
            this.overflowUserActionsConfig.actions[buttonIndex]();
        },
        actions: [
            //Zum Admin befördern
            () => {
                this.setState({showMakeAdminDialog: true})

            },
            //Entfernen
            () => {
                this.setState({showRemoveUserDialog: true})

            },
            //Abbrechen
            () => {
                console.log("action cancelled")
            },
        ],
    };

    overflowRequestActionsConfig(isInvite) {
        return {
            config:
                {
                    options: isInvite ? [
                        {text: "Entfernen", icon: "md-alert", iconColor: "#444"},
                        {text: "Abbrechen", icon: "close", iconColor: "#25de5b"}
                    ] : [
                        {text: "Annehmen", icon: "md-alert", iconColor: "#444"},
                        {text: "Entfernen", icon: "md-alert", iconColor: "#444"},
                        {text: "Abbrechen", icon: "close", iconColor: "#25de5b"}
                    ],
                    cancelButtonIndex: 2,
                    destructiveButtonIndex: 1,
                },

            callback: (buttonIndex) => {

                let actions = isInvite ? [
                    () => {
                        this.setState({showDeclineUserDialog: true})
                    },
                    //Abbrechen
                    () => {
                        console.log("action cancelled")
                    },
                ] : [
                    //Annehmen
                    () => {
                        this.setState({showAddUserDialog: true})
                    },
                    //Entfernen
                    () => {
                        this.setState({showDeclineUserDialog: true})
                    },
                    //Abbrechen
                    () => {
                        console.log("action cancelled")
                    },
                ];
                actions[buttonIndex]();
            },

        };
    }

    overflowAdminActionsConfig = {
        config:
            {
                options: [
                    {text: "Adminstatus entfernen", icon: "md-alert", iconColor: "#444"},
                    {text: "Abbrechen", icon: "close", iconColor: "#25de5b"}
                ],
                cancelButtonIndex: 1,
                destructiveButtonIndex: 0,
            },
        callback: (buttonIndex) => {
            this.overflowAdminActionsConfig.actions[buttonIndex]();
        },
        actions: [
            //Adminstatus entfernen
            () => {
                this.setState({showDemoteAdminDialog: true})

            },
            //Abbrechen
            () => {
                console.log("action cancelled")
            },
        ],
    };

    overflowAsUserActionsConfig = {
        config:
            {
                options: [
                    {text: "Aus Team austreten", icon: "md-alert", iconColor: "#444"},
                    {text: "Abbrechen", icon: "close", iconColor: "#25de5b"}
                ],
                cancelButtonIndex: 1,
                destructiveButtonIndex: 0,
            },
        callback: (buttonIndex) => {
            this.overflowAsUserActionsConfig.actions[buttonIndex]();
        },
        actions: [
            //Adminstatus entfernen
            () => {
                console.log("asUserAction emitted");

                this.setState({showLeaveTeamDialog: true})
            },
            //Abbrechen
            () => {
                console.log("action cancelled")
            },
        ],
    };

    render() {
        let {member, ownStatus, editMode, refetch} = this.props;
        const {isAdmin, isActive} = member;
        console.log("Ownstatus: ", {ownStatus: ownStatus})
        return (
            <CardItem style={{
                width: '100%',
                color: 'white',

            }}>
                <Left>
                    <Image
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 16
                        }}
                        source={{uri: Util.AvatarToUri(member.user.avatar)}}
                        resizeMode="contain"/>
                </Left>
                <Body style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'stretch'
                }}>
                    <Text
                        style={isAdmin ? {fontWeight: 'bold'} : (isActive ? {} : {color: '#aaa'})}>{member.user.screenName}</Text>
                </Body>
                {editMode && <Right>
                    <Button style={{width: 40, height: '100%', flex: 1, justifyContent: 'center'}} transparent dark
                            onPress={() => {
                                console.log(ownStatus);
                                if (ownStatus.isAdmin) {
                                    member.isAdmin ? ActionSheet.show(
                                        this.overflowAdminActionsConfig.config,
                                        this.overflowAdminActionsConfig.callback
                                    ) : (member.isActive ? ActionSheet.show(
                                            this.overflowUserActionsConfig.config,
                                            this.overflowUserActionsConfig.callback
                                        ) : ActionSheet.show(
                                            this.overflowRequestActionsConfig(!member.isAccepted).config,
                                            this.overflowRequestActionsConfig(!member.isAccepted).callback
                                        )
                                    )
                                } else if (ownStatus.isActive) {
                                    ActionSheet.show(
                                        this.overflowAsUserActionsConfig.config,
                                        this.overflowAsUserActionsConfig.callback
                                    )
                                }
                            }}>
                        <Icon name={"md-more"}/>

                        <Mutation
                            mutation={CONFIRM_MEMBER}
                            errorPolicy="all"
                            refetchQueries={[
                                {
                                    query: GET_TEAM,
                                    variables: {
                                        teamId: ownStatus.teamId
                                    }
                                },
                                {
                                    query: GET_MY_TEAM,
                                    variables: {
                                        teamId: ownStatus.teamId
                                    }
                                },
                                {
                                    query: MY_MEMBERSHIPS,
                                },
                            ]}
                        >
                            {(confirmMember, {loading, error}) => {
                                return (
                                    <MaterialDialog
                                        title={`Nutzer zum Team hinzufügen?`}
                                        visible={this.state.showAddUserDialog}
                                        onOk={() => {
                                            confirmMember({
                                                variables: {
                                                    membershipId: member.id
                                                }
                                            })
                                                .then()
                                                .catch((error) => console.log(error));
                                            this.setState({showAddUserDialog: false})
                                        }}
                                        onCancel={() => this.setState({showAddUserDialog: false})}>
                                        <Fragment/>
                                    </MaterialDialog>
                                )
                            }}
                        </Mutation>

                        <Mutation mutation={MOD_USER}
                                  errorPolicy="all"
                                  refetchQueries={[
                                      {
                                          query: GET_TEAM,
                                          variables: {
                                              teamId: ownStatus.teamId
                                          }
                                      },
                                      {
                                          query: GET_MY_TEAM,
                                          variables: {
                                              teamId: ownStatus.teamId
                                          }
                                      },
                                      {
                                          query: MY_MEMBERSHIPS,
                                      },
                                  ]}
                        >
                            {(modMember, {loading, error}) => {
                                return (
                                    <MaterialDialog
                                        title={`Nutzer zum Admin machen?`}
                                        visible={this.state.showMakeAdminDialog}
                                        onOk={() => {
                                            modMember({
                                                variables: {
                                                    membershipId: member.id
                                                }
                                            })
                                                .then()
                                                .catch((error) => console.log(error));

                                            this.setState({showMakeAdminDialog: false})
                                        }}
                                        onCancel={() => this.setState({showMakeAdminDialog: false})}>
                                        <Fragment/>

                                    </MaterialDialog>
                                )
                            }}
                        </Mutation>

                        <Mutation mutation={UNMOD_USER}
                                  errorPolicy="all"
                                  refetchQueries={[
                                      {
                                          query: GET_TEAM,
                                          variables: {
                                              teamId: ownStatus.teamId
                                          }
                                      },
                                      {
                                          query: GET_MY_TEAM,
                                          variables: {
                                              teamId: ownStatus.teamId
                                          }
                                      },
                                      {
                                          query: MY_MEMBERSHIPS,
                                      },
                                  ]}>
                            {(unmodMember, {loading, error}) => {
                                return (
                                    <MaterialDialog
                                        title={`Admin zu normalem Benutzer machen?`}
                                        visible={this.state.showDemoteAdminDialog}
                                        onOk={() => {
                                            unmodMember({
                                                variables: {
                                                    membershipId: member.id
                                                }
                                            })
                                                .then()
                                                .catch((error) => console.log(error));

                                            this.setState({showDemoteAdminDialog: false})
                                        }}
                                        onCancel={() => this.setState({showDemoteAdminDialog: false})}>
                                        <Fragment/>
                                    </MaterialDialog>
                                )
                            }}
                        </Mutation>

                        <Mutation mutation={DEL_USER}
                                  errorPolicy="all"
                                  refetchQueries={[
                                      {
                                          query: GET_TEAM,
                                          variables: {
                                              teamId: ownStatus.teamId
                                          }
                                      },
                                      {
                                          query: GET_MY_TEAM,
                                          variables: {
                                              teamId: ownStatus.teamId
                                          }
                                      },
                                      {
                                          query: MY_MEMBERSHIPS,
                                      },
                                  ]}
                        >
                            {(delMember, {loading, error}) => {
                                return (
                                    <MaterialDialog
                                        title={`Nutzer entfernen?`}
                                        visible={this.state.showRemoveUserDialog}
                                        onOk={() => {
                                            delMember({
                                                variables: {
                                                    membershipId: member.id
                                                }
                                            })
                                                .then()
                                                .catch((error) => console.log(error));
                                            this.setState({showRemoveUserDialog: false})
                                        }}
                                        onCancel={() => this.setState({showRemoveUserDialog: false})}>
                                        <Fragment/>
                                    </MaterialDialog>
                                )
                            }}
                        </Mutation>

                        <Mutation mutation={DEL_USER}
                                  errorPolicy="all"
                                  refetchQueries={[
                                      {
                                          query: GET_TEAM,
                                          variables: {
                                              teamId: ownStatus.teamId
                                          }
                                      },
                                      {
                                          query: GET_MY_TEAM,
                                          variables: {
                                              teamId: ownStatus.teamId
                                          }
                                      },
                                      {
                                          query: MY_MEMBERSHIPS,
                                      },
                                  ]}
                        >
                            {(delMember, {loading, error}) => {
                                return (
                                    <MaterialDialog
                                        title={`Nutzer ablehnen?`}
                                        visible={this.state.showDeclineUserDialog}
                                        onOk={() => {
                                            delMember({
                                                variables: {
                                                    membershipId: member.id
                                                }
                                            })
                                                .then()
                                                .catch((error) => console.log(error));
                                            this.setState({showDeclineUserDialog: false})
                                        }}
                                        onCancel={() => this.setState({showDeclineUserDialog: false})}>
                                        <Fragment/>
                                    </MaterialDialog>
                                )
                            }}
                        </Mutation>

                        <Mutation mutation={LEAVE_TEAM}
                                  errorPolicy="all"
                                  refetchQueries={[
                                      {
                                          query: GET_TEAM,
                                          variables: {
                                              teamId: ownStatus.teamId
                                          }
                                      },
                                      {
                                          query: GET_MY_TEAM,
                                          variables: {
                                              teamId: ownStatus.teamId
                                          }
                                      },
                                      {
                                          query: MY_MEMBERSHIPS,
                                      },
                                  ]}
                        >
                            {(delMember, {loading, error}) => {
                                return (
                                    <MaterialDialog
                                        title={`Aus dem Team austreten?`}
                                        visible={this.state.showLeaveTeamDialog}
                                        onOk={() => {
                                            delMember({
                                                variables: {
                                                    membershipId: member.id
                                                }
                                            })
                                                .then()
                                                .catch((error) => console.log(error));
                                            this.setState({showLeaveTeamDialog: false})
                                        }}
                                        onCancel={() => this.setState({showLeaveTeamDialog: false})}>
                                        <Fragment/>
                                    </MaterialDialog>
                                )
                            }}
                        </Mutation>


                    </Button>
                </Right>}
            </CardItem>
        )
    }
}