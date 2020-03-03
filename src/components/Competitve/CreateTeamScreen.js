import React, {Component} from "react";
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Form,
    H1,
    Header,
    Left, Input,
    Right,
    Text,
    Title, Textarea, Label, ActionSheet, Icon
} from "native-base";
import material from "../../../native-base-theme/variables/material";
import {Mutation} from "react-apollo";
import {CREATE_TEAM, INVITE_USER} from "../../network/Teams.gql";
import UploadImage from "../Common/UploadImage";
import {ValidatingTextField} from "../Common/ValidatingTextInput";
import PropTypes from 'prop-types';
import {StyleSheet, View, Switch} from "react-native";
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";
import SafeAreaView from 'react-native-safe-area-view';
import {createStackNavigator} from "@react-navigation/stack";

export class CreateTeamScreen extends Component {

    state = {
        teamName: '',
        teamNameInput: undefined,
        nameError: '',
        mediaId: undefined,
        showErrors: false,
        teamDescription: '',
        isPrivate: false

    };

    render() {
        let {requestModalClose, onComplete} = this.props;
        return (
            <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
                <Container>
                    <Header>

                        <Left>
                            <Button transparent onPress={() => {
                                this.props.navigation.navigate('MyTeams');
                            }}>
                                <Icon name='md-arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>
                                {L.get("create_team_view_title")}
                            </Title>
                        </Body>
                    </Header>

                    <Content style={{flex: 1}}>


                        <Card transparent style={{
                            margin: '10%',
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'stretch'
                        }}>

                            <CardItem style={{flex: 1, flexDirection: 'row', justifyContent: 'center',}}>
                                <View style={{height: 200, width: 200}}>
                                    <UploadImage onUploadFinished={(media, err) => err ? null : this.setState({mediaId: media.id})}/>
                                </View>
                            </CardItem>

                            <CardItem>
                                <Form style={{flex: 1, alignItems: 'stretch'}}>
                                    <ValidatingTextField
                                        name='teamName'
                                        validateAs='teamName'
                                        label={L.get("create_team_view_team_name_label")}
                                        onChangeText={(text) => this.setState({teamName: text})}
                                        value={this.state.teamName}
                                        showErrors={this.state.showErrors}
                                        externalError={this.state.nameError}
                                        ref={(ref) => this.teamNameInput = ref}
                                    />
                                </Form>
                            </CardItem>

                            <CardItem>
                                <Form style={{flex: 1, alignItems: 'stretch'}}>
                                    <Textarea rowSpan={5} bordered
                                              name='teamDescription'
                                              onChangeText={(text) => this.setState({teamDescription: text})}
                                              value={this.state.teamDescription} style={{
                                        borderColor: material.textColor,

                                    }}
                                    />
                                    <Label style={{

                                        color: material.textColor,
                                        fontSize: 12,
                                        marginBottom: 5
                                    }}>{L.get("create_team_view_team_description_label")}</Label>

                                </Form>
                            </CardItem>

                            <CardItem>

                                <Left>
                                    <Text>Geschlossene Gruppe</Text>
                                </Left>
                                <Right>
                                    <Switch value={this.state.isPrivate} onValueChange={
                                        () => {
                                            this.setState({isPrivate: !this.state.isPrivate})
                                        }
                                    }/>
                                </Right>

                            </CardItem>

                            <CardItem footer>
                                <Right style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Button transparent onPress={() => requestModalClose()}>
                                        <Text>{L.get("create_team_view_cancel")}</Text>
                                    </Button>
                                    <Mutation mutation={CREATE_TEAM} errorPolicy="all">
                                        {(createTeam) => {
                                            return (
                                                <Button transparent
                                                        onPress={() => {
                                                            this.setState({showErrors: true});
                                                            let validationError = this.teamNameInput.getErrors();
                                                            console.log(validationError);
                                                            if (validationError) {
                                                                console.log(validationError);
                                                                return
                                                            }
                                                            createTeam({
                                                                variables: {
                                                                    name: this.state.teamName,
                                                                    description: this.state.teamDescription,
                                                                    avatarId: this.state.mediaId,
                                                                    closed: this.state.isPrivate
                                                                }
                                                            })
                                                                .then(({data}) => {
                                                                    //this.props.navigation.navigate((users ? "InviteUsers" : "EditTeam"), {teamId: teamId, teamData})
                                                                    console.log(data);
                                                                    this.props.navigation.navigate('InviteUsers', {
                                                                        teamId: data.createTeam.id
                                                                    })
                                                                })
                                                                .catch(err => {
                                                                    console.log(err.message);
                                                                    this.setState({nameError: err.message})
                                                                })
                                                        }}>
                                                    <Text>{L.get("create_team_view_continue")}</Text>
                                                </Button>
                                            )
                                        }}
                                    </Mutation>
                                </Right>
                            </CardItem>
                        </Card>


                    </Content>
                </Container>
            </SafeAreaView>)
    };
}

export class InviteUsersScreen extends Component {
    static navigationOptions = {
        title: 'Nutzer einladen',
        headerStyle: {
            backgroundColor: material.brandInfo,
        },
        headerTintColor: '#fff',
    }
    state = {
        searchParam: '',
        showSuccess: false,
        showError: false,
    };

    render() {
        let {requestModalClose, onComplete, navigation, route} = this.props;
        const {teamId} = route.params
        return (
            <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
                <Container>
                    <Header>

                        <Left>
                            <Button transparent onPress={() => {
                                navigation.navigate('MyTeams');
                            }}>
                                <Icon name='md-arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>
                                {L.get("create_team_view_invite_view_title")}
                            </Title>
                        </Body>
                    </Header>

                    <Content style={{flex: 1}}>


                        <Card transparent style={{
                            margin: '10%',
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'stretch'
                        }}>

                            <CardItem>
                                <Form style={{flex: 1, alignItems: 'stretch'}}>
                                    <Input
                                        name='searchParam'
                                        label='searchParam'
                                        onChangeText={(text) => this.setState({searchParam: text})}
                                        value={this.state.searchParam}
                                        showErrors={this.state.showErrors}
                                        externalError={this.state.nameError}
                                        ref={(ref) => this.teamNameInput = ref}
                                    />
                                    <Label style={{

                                        color: material.textColor,
                                        fontSize: 12,
                                        marginBottom: 5
                                    }}>{L.get("create_team_view_invite_label")}</Label>
                                </Form>
                            </CardItem>

                            <CardItem>
                                <Right style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Mutation mutation={INVITE_USER} errorPolicy="all">
                                        {(inviteUserToTeam, {loading, error}) => (

                                            <Button transparent onPress={() => {
                                                this.setState({showError: false, showSuccess: false});
                                                inviteUserToTeam({
                                                        variables: {
                                                            teamId,
                                                            screenName: this.state.searchParam
                                                        }
                                                    })
                                                        .then(() => this.setState({showSuccess: true, showError: false}))
                                                        .catch((err) => {
                                                            console.log(JSON.stringify(err, null, 4));
                                                            this.setState({showSuccess: false,showError: L.get("invite_error")})
                                                        })
                                            }}>
                                                <Text>{L.get("create_team_view_invite")}</Text>
                                            </Button>
                                        )}
                                    </Mutation>
                                </Right>
                            </CardItem>

                            <CardItem  style={{flex:1,justifyContent: 'flex-end' }}>
                                {(this.state.showSuccess && !this.state.showError) &&
                                <Text style={{color: '#5f5'}}>Deine Einladung wurde erfolgreich verschickt!</Text>}
                                {this.state.showError && <Text>{this.state.showError}</Text>}
                            </CardItem>

                            <CardItem footer style={{flex:1,justifyContent: 'flex-end' }}>
                                <Right style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Button transparent
                                            onPress={() => {
                                                this.props.navigation.navigate('Main')
                                            }}>
                                        <Text>{L.get("create_team_view_confirm")}</Text>
                                    </Button>
                                </Right>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            </SafeAreaView>)
    };
}

const Stack = createStackNavigator();
export default () => {
    return(
        <Stack.Navigator
            headerMode="none"
            options={{
            headerMode: "none",
            mode: 'modal',
        }}>
            <Stack.Screen name="MakeTeam" component={CreateTeamScreen}/>
            <Stack.Screen name="InviteUsers" component={InviteUsersScreen}/>
        </Stack.Navigator>
    )
};
/*
export default createStackNavigator(
    {
        MakeTeam: {
            screen: CreateTeamScreen
        },
        InviteUsers: {
            screen: InviteUsersScreen
        }
    },
    {
        navigationOptions: {
            headerMode: "none",
            mode: 'modal',

            header: null

        },
        headerMode: "none",
        mode: 'modal',
    });
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: material.brandInfo
    }
});