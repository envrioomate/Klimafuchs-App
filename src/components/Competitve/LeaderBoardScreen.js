import React, {Component, Fragment} from 'react';
import {RefreshControl, Text, View, ImageBackground} from 'react-native';
import {Body, Button, Container, Content, Form, Icon, List, ListItem, Picker, Right, Left, Spinner} from "native-base";
import {Mutation, Query} from "react-apollo";
import {CURRENT_USER_ID, LEADERBOARD, MY_MEMBERSHIPS, REQUEST_JOIN_TEAM, TeamSize} from "../../network/Teams.gql";
import * as env from "../../../env"
import {MaterialDialog} from 'react-native-material-dialog';
import { BlurView } from 'expo-blur';
import material from "../../../native-base-theme/variables/material";
import {TeamDetailsModalContent} from "./TeamDetailsModalContent";
import {FSModal} from "../Common/FSModal";
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";

export class LeaderBoardScreen extends Component {
    static navigationOptions = {
        title: 'Leaderboard',
    };

    state = {
        refreshing: false,
        endReached: false,
        sizeFilter: TeamSize.SOLO.value,
        user: undefined
    };

    sizeOptions = () => {
        return Object.keys(TeamSize).map(option =>
            <Picker.Item key={option} label={TeamSize[option].name} value={TeamSize[option].value}/>)
    };

    pageSize = 10;


    render() {
        return (
            <Query query={MY_MEMBERSHIPS}>
                {({loading, error, data}) => {
                    if (loading) return <Spinner/>;
                    if (error) return <Text>{JSON.stringify(error)}</Text>
                    const myMemberships = data.myMemberships;
                    return (
                        <Container style={{flex: 1}}>

                            <Query query={LEADERBOARD}
                                   variables={{
                                       connectionArgs: {first: this.pageSize},
                                   }}>
                                {({loading, error, data, refetch, fetchMore}) => {
                                    if (loading) {
                                        return <Text>Loading...</Text>;
                                    }
                                    if (error) return <Text>{error.message}</Text>;
                                    if (data.getLeaderBoard) {
                                        console.log(data)
                                        if (data.getLeaderBoard.page.edges.length > 0) {
                                            return (
                                                <Fragment>
                                                    {this.renderLeaderBoard(data.getLeaderBoard.page.edges, refetch, this.renderFetchMoreButton(data, loading, fetchMore), myMemberships)}
                                                </Fragment>
                                            );
                                        } else {
                                            return (
                                                <Fragment>
                                                    <Text>Es gibt noch keine Teams</Text>
                                                </Fragment>
                                            )
                                        }
                                    } else {
                                        return (
                                            <Content
                                                style={{
                                                    marginTop: 5,
                                                    marginBottom: 5,
                                                }}
                                                refreshControl={<RefreshControl
                                                    refreshing={this.state.refreshing}
                                                    onRefresh={() => {
                                                        this.setState({refreshing: true});
                                                        refetch().then(this.setState({refreshing: false}))
                                                    }}
                                                />
                                                }>
                                                <Text>hmm...</Text>
                                            </Content>
                                        )
                                    }
                                }}
                            </Query>
                        </Container>
                    )
                }}
            </Query>
        );
    }

    renderFetchMoreButton(data, loading, fetchMore) {
        console.log(this.state.endReached)
        return (
            <Button full light disabled={this.state.refreshing || this.state.endReached} onPress={() => {
                const lastCursor = data.getLeaderBoard.page.edges[data.getLeaderBoard.page.edges.length - 1].cursor;
                fetchMore({
                    variables: {
                        connectionArgs: {
                            first: this.pageSize,
                            after: lastCursor
                        },
                        teamSize: this.state.sizeFilter
                    },
                    updateQuery: (prev, {fetchMoreResult}) => {
                        if (!fetchMoreResult) return prev;
                        if (fetchMoreResult.getLeaderBoard.page.edges.length === 0) {
                            console.log("no more data");
                            this.setState({endReached: true})
                        }
                        return Object.assign(data.getLeaderBoard.page, prev, {
                            edges: [...prev.getLeaderBoard.page.edges, ...fetchMoreResult.getLeaderBoard.page.edges]
                        });
                    }
                })
            }}><Text>{L.get("load_more_teams")}</Text></Button>
        )
    }

    renderLeaderBoard(leaderBoard, refetch, lbutton, myMemberships) {
        return (
            <Container style={{flex: 1}}>
                <Content
                    style={{
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                    refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({refreshing: true});
                            refetch().then(this.setState({refreshing: false}))
                        }}
                    />
                    }>
                    <List>
                        {leaderBoard.map((team, index) => {
                            return (
                                <TeamCard key={team.cursor} index={index} team={team} myMemberships={myMemberships}/>
                            )
                        })}
                    </List>
                    {lbutton}
                </Content>
            </Container>
        )
    };


}


class TeamCard extends Component {

    state = {
        showJoinDialog: false,
    };

    render() {
        let {index, team, myMemberships} = this.props;
        let {node, cursor} = team;
        const teamAvatarUrl =
            node.avatar
                ? `${env.dev.API_IMG_URL}${node.avatar.filename}`
                : `${env.dev.API_IMG_URL}avatar_default.png`;
        const membershipInTeam = myMemberships.filter((member) => member.team.id === node.id)[0] || null;
        const hasActiveTeam = myMemberships.filter((member) => member.isActive).length > 0
        const isMember = membershipInTeam && membershipInTeam.isActive;
        const pendingRequest =  membershipInTeam && !membershipInTeam.isActive;

        console.log("TeamCard " + index + ": ",
            node.name, membershipInTeam, isMember, pendingRequest
        )

        const rightContent = isMember
            ? <Fragment>
                <Button transparent onPress={() => {
                }}>
                    <Text>
                        {L.get("join_team_button_member")}
                    </Text>
                </Button>
            </Fragment>
            : pendingRequest
                ? <Fragment>
                    <Button transparent onPress={() => {
                    }}>
                        <Text>
                            {L.get("join_team_button_request_send")}
                        </Text>
                    </Button>
                </Fragment>
                : team.node.closed || hasActiveTeam ? <Fragment/> :<Fragment>
                    <Mutation mutation={REQUEST_JOIN_TEAM}
                              refetchQueries={[{query: LEADERBOARD}]}
                    >
                        {(requestJoinTeam) => {
                            return (
                                <Button light onPress={() => {
                                    this.setState({showJoinDialog: true})
                                }}>
                                    <Text>
                                        {L.get("join_team_button_join")}
                                    </Text>
                                    <MaterialDialog
                                        title={L.get("join_team_dialog_title", {teamName: team.node.name})}
                                        visible={this.state.showJoinDialog}
                                        onOk={() => {
                                            console.log(team)
                                            requestJoinTeam({
                                                variables: {
                                                    teamId: node.id
                                                }
                                            }).then((data) => {
                                                console.log(data)
                                            })
                                                .catch(error => {
                                                    console.log(error.message);
                                                })
                                            this.setState({showJoinDialog: false})
                                        }}
                                        onCancel={() => this.setState({showJoinDialog: false})}>
                                        <Text/>
                                    </MaterialDialog>
                                </Button>
                            )
                        }}
                    </Mutation>
                </Fragment>;

        const avatarAndPlaceIndicator = <View style={{width: 64, height: 64}}>
            <ImageBackground source={{uri: teamAvatarUrl}} style={{width: '100%', height: '100%'}}>
                <View style={{top: '50%', height: '50%'}}>
                    <BlurView tint="light" intensity={50} style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text>{node.place}</Text>
                    </BlurView>
                </View>
            </ImageBackground>
        </View>;
        return (
            <FSModal
                ref={(ref) => {
                    this.teamDetails = ref;
                }}
                body={<TeamDetailsModalContent
                    teamId={node.id}
                    requestModalClose={() => this.teamDetails.closeModal()}
                    ref={(ref) => {
                        this.teamDetailsContent = ref
                    }}
                />}
            >
            <ListItem onPress={() => {
                this.teamDetails.openModal()
            }}>
                <Left style={{flex:1}}>
                    {avatarAndPlaceIndicator}
                </Left>
                <Body style={{height: '100%', flex: 3, paddingLeft: 10}}>
                        <View>
                            <Text>{node.name}</Text>
                            <Text style={{color: material.textLight}}>{node.description}</Text>
                        </View>
                </Body>
                <Right style={{flex:1,height: '100%'}}>
                    {rightContent}
                </Right>
            </ListItem>
            </FSModal>
        )
    }
}
