import React, {Fragment} from 'react';

import {Body, Header, Icon, Left, Right, Title} from "native-base";
import material from "../../../native-base-theme/variables/material";
import { TeamsScreen} from "./TeamsScreen";
import {LeaderBoardScreen} from "./LeaderBoardScreen";
import CreateTeamScreen, {InviteUsersScreen} from "./CreateTeamScreen";
import {EditTeamScreen} from "./EditTeamScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import SafeAreaView from "react-native-safe-area-view";
import {StyleSheet} from "react-native";
import Constants from "expo-constants";
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TeamsNav = () => {
    return (
            <Stack.Navigator
                headerMode="none"
            >
                <Stack.Screen name="Main" component={LeaderBoardNav}/>
                <Stack.Screen name="CreateTeam" component={CreateTeamScreen}/>
                <Stack.Screen name="EditTeam" component={EditTeamScreen}/>
                <Stack.Screen name="InviteUsers" component={InviteUsersScreen}/>

            </Stack.Navigator>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: material.brandInfo,
        alignItems: 'center',
        justifyContent: 'center',

    }
});


const LeaderBoardNav = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Teams" component={LeaderBoardScreen} options={{
                title: L.get("teams_tab_leaderboard_title"),
            }}/>
            <Tab.Screen name="MyTeams" component={TeamsScreen} options={{
                title: L.get("teams_tab_myteam_title"),
            }}/>
        </Tab.Navigator>
    )
};
/*
const TeamsNav = createStackNavigator(
    {
        Main: {
            screen: createMaterialTopTabNavigator(
                {
                    Teams: {
                        screen: LeaderBoardScreen
                    },
                    MyTeams: {
                        screen: TeamsScreen
                    },
                }, {
                    navigationOptions: {
                        header: (
                            <Fragment>
                                <Header transparent style={{backgroundColor: material.brandInfo}}>
                                    <Left/>
                                    <Body>
                                        <Title>Teams</Title>
                                    </Body>
                                    <Right/>
                                </Header>
                            </Fragment>
                        ),
                    },
                    headerMode: 'screen',

                    tabBarOptions: {
                        style: {
                            backgroundColor: material.brandInfo,
                        },
                        indicatorStyle: {
                            backgroundColor: material.brandLight,
                        }
                    },
                    initialRouteName: 'Teams',

                },

),
        },

        CreateTeam: {
            screen: CreateTeamScreen
        },
        EditTeam: {
            screen: EditTeamScreen
        }

    }, {
        navigationOptions: {
            title: 'Teams',
            tabBarIcon: ({focused, tintColor}) => (
                <Icon name='md-people' style={{fontSize: 20, color: tintColor}}/>
            ),
            header: null
        },

    }
);
*/
export default TeamsNav;