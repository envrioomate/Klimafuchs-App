import React, {Component} from 'react';
import {Image, RefreshControl, StyleSheet, View} from 'react-native';
import {
    Body,
    Button,
    CardItem,
    Container,
    Content,
    Fab,
    H3,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    StyleProvider,
    Text
} from "native-base";
import getTheme from '../../../native-base-theme/components';
import {MY_MEMBERSHIPS} from "../../network/Teams.gql";
import {Query} from "react-apollo";
import material from "../../../native-base-theme/variables/material";
import {CreateTeamScreen} from "./CreateTeamScreen";
import env from "../../../env";
import {FSModal} from "../Common/FSModal";
import {TeamDetailsModalContent} from "./TeamDetailsModalContent";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();


export class TeamsScreen extends Component {
    state = {
        refreshing: false,
    };

    static navigationOptions = {
        title: 'Meine Teams',
    };

    inviteToTeam = (teamId, users, teamData) => {
        this.props.navigation.navigate("InviteUsers", {teamId: teamId, teamData})
    };

    editTeam = (teamId, users, teamData) => {
        this.props.navigation.navigate((users ? "InviteUsers" : "EditTeam"), {teamId: teamId, teamData})

    }

    renderTeamsGettingStarted = (refetch) => (
        <Content
            style={{
                flex: 1,
                marginLeft: '10%',
                marginRight: '10%',
                marginTop: '20%',
                marginBottom: '20%',
            }}
            contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            refreshControl={<RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    this.setState({refreshing: true});
                    refetch().then(this.setState({refreshing: false}))
                }}
            />}
        >

            <H3 style={{marginBottom: '5%'}}>Du hast noch kein Team</H3>

            <FSModal
                ref={(ref) => {
                    this.teamPicker = ref;
                }}
                body={<CreateTeamScreen
                    onComplete={refetch}
                    requestModalClose={() => this.teamPicker.closeModal()}/>}
            >
                <Button block
                        style={styles.ctaButton}
                        onPress={() => this.props.navigation.navigate('CreateTeam')}>
                    <Text>Team erstellen</Text>
                </Button>
            </FSModal>
            <Button block
                    style={styles.ctaButton}
                    onPress={() => {
                        this.props.navigation.navigate('Teams')
                    }}>
                <Text>Team beitreten</Text>
            </Button>
        </Content>
    );

    renderTeams = (memberships, refetch) => {
        const hasActiveTeam = memberships.filter((member) => member.isActive).length > 0;

        if (!hasActiveTeam) return this.__renderTeamsOld(memberships, refetch);

        let mainTeam = memberships[0];
        let editMode = mainTeam.isAdmin;
        return (
            <TeamDetailsModalContent
                teamId={mainTeam.team.id}
                ownStatus={mainTeam}
                editMode={this.editTeam}
                requestModalClose={() => console.log("quit modal")}
                standalone
                ref={(ref) => {
                    this.teamDetailsContent = ref
                }}
            />
        )
    };
    __renderTeamsOld = (memberships, refetch) => {
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

                    <CardItem>
                        <Text>
                            Einladungen
                        </Text>

                    </CardItem>
                    <List>
                        {memberships.map((membership) => {
                            return (
                                <TeamCard key={membership.id} membership={membership} editMode={this.inviteToTeam}/>
                            )
                        })}
                    </List>
                </Content>
                <FSModal
                    ref={(ref) => {
                        this.teamPicker = ref;
                    }}
                    body={<CreateTeamScreen
                        onComplete={refetch}
                        requestModalClose={() => this.teamPicker.closeModal()}/>}
                >
                    <Fab style={{backgroundColor: material.brandInfo}}
                         onPress={() => this.props.navigation.navigate('CreateTeam')}
                         position="bottomRight">
                        <Icon name='md-add' style={{color: material.brandDark}}/>
                    </Fab>
                </FSModal>

            </Container>
        )
    };

    render() {
        return (
            <Container style={{flex: 1}}>
                <Query query={MY_MEMBERSHIPS}>
                    {({loading, error, data, refetch}) => {
                        if (loading) {
                            return <Text>Loading...</Text>;
                        }
                        if (error) return <Text>{error.message}</Text>;
                        if (data) {
                            if (data.myMemberships.length > 0) {
                                return this.renderTeams(data.myMemberships, refetch);
                            } else {
                                return this.renderTeamsGettingStarted(refetch)
                            }
                        }
                    }}
                </Query>
            </Container>
        );
    }

}

class TeamCard extends Component {

    overflowActionsConfig = {
        config:
            {
                options: [
                    {text: "Entfernen", icon: "md-alert", iconColor: "#fa213b"},
                    {text: "Zum Admin befördern", icon: "md-star", iconColor: "#25de5b"},
                    {text: "Abbrechen", icon: "cancel", iconColor: "#25de5b"}
                ],
                cancelButtonIndex: 2,
                destructiveButtonIndex: 0,
                title: ""
            },
        callback: (buttonIndex) => {
            this.overflowActionsConfig.actions[buttonIndex]();
            this.actionSheetAction({
                index: buttonIndex,
                pressed: this.overflowActionsConfig.config.options[buttonIndex]
            });
        },
        actions: [
            () => {

            },
            () => {
                console.log("action cancelled")
            },

        ],
    };

    actionSheetAction(param) {
        this.overflowActionsConfig.actions[param.index]();
    }


    render() {
        const {membership, editMode} = this.props;
        const teamAvatarUrl =
            membership.team.avatar
                ? `${env.dev.API_IMG_URL}${membership.team.avatar.filename}`
                : `${env.dev.API_IMG_URL}avatar_default.png`;
        console.log("image url: ", teamAvatarUrl)
        return (

            <FSModal
                ref={(ref) => {
                    this.teamDetails = ref;
                }}
                body={<TeamDetailsModalContent
                    teamId={membership.team.id}
                    ownStatus={membership}
                    editMode={editMode}
                    requestModalClose={() => this.teamDetails.closeModal()}
                    ref={(ref) => {
                        this.teamDetailsContent = ref
                    }}
                />}
            >
                <ListItem onPress={() => {
                    this.teamDetails.openModal()
                }}>
                    <Left>
                        <Image source={{uri: teamAvatarUrl}} style={{width: 64, height: 64}}/>
                    </Left>
                    <Body style={{height: '100%', flex: 3, paddingLeft: 10}}>
                        <View>
                            <Text>{membership.team.name}</Text>
                            <Text style={{color: material.textLight}}>{membership.team.description}</Text>
                        </View>
                    </Body>
                    <Right>
                        {membership.isAdmin && <StyleProvider style={getTheme({iconFamily: "MaterialCommunityIcons"})}>
                            <Icon type="MaterialCommunityIcons" name='account-check' style={{color: '#000'}}/>
                        </StyleProvider>}
                    </Right>
                </ListItem>
            </FSModal>


        )
    }


}

const styles = StyleSheet.create({
    ctaButton: {
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 9,
        marginLeft: '20%',
        marginRight: '20%',
    },
});
