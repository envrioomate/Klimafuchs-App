import React, {Fragment} from 'react';
import {Body, Header, Icon, Left, Right, Title} from "native-base";
import material from "../../../native-base-theme/variables/material";
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {AchievementComponent} from "./AchievementComponent";
import {CurrentBadgesComponent} from "./CurrentBadgesComponent";
import {BadgeCollectionComponent} from "./BadgeCollectionComponent";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const BadgeNavigation = () => {
    return (
        <Tab.Naviagtor
            tabBarOptions={{
                style: {
                    backgroundColor: material.brandInfo,
                },
                indicatorStyle: {
                    backgroundColor: material.brandLight,
                }
            }}

            options={{
                header: ({scene, previous, navigation}) => {
                    return (
                        <Fragment>
                            <Header transparent style={{backgroundColor: material.brandInfo}}>
                                <Left/>
                                <Body>
                                    <Title>Persistent Score Placeholder</Title>
                                </Body>
                                <Right/>
                            </Header>
                        </Fragment>
                    )
                }
            }}
        >
            <Tab.Screen name="Achievements" component={AchievementComponent}/>
            <Tab.Screen name="CurrentTopic" component={CurrentBadgesComponent}/>
            <Tab.Screen name="BadgeCollection" component={BadgeCollectionComponent}/>
        </Tab.Naviagtor>
    )
};

export const BadgeScreen = () => {
    return (
        <Stack.Navigator
            options={{
                title: 'Thema',
                tabBarIcon: ({focused, tintColor}) => (
                    <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
                ),
                headerMode: 'screen'
            }}
        >
            <Stack.Screen name="Main" component={BadgeNavigation}/>
        </Stack.Navigator>
    )
};
/*
export const BadgeNavigation = createMaterialTopTabNavigator(
    {
        Achievements: {
            screen: AchievementComponent
        },
        CurrentTopic: {
            screen: CurrentBadgesComponent
        },
        BadgeCollection: {
            screen: BadgeCollectionComponent
        }
    }, {
        navigationOptions: {
            tabBarIcon: ({focused, tintColor}) => (
                <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
            ),
            header: (
                <Fragment>
                    <Header transparent style={{backgroundColor: material.brandInfo}}>
                        <Left/>
                        <Body>
                            <Title>Persistent Score Placeholder</Title>
                        </Body>
                        <Right/>
                    </Header>
                </Fragment>
            ),
            headerMode: 'screen',

            initialRouteName: 'CurrentTopic'
        },
        tabBarOptions: {
            style: {
                backgroundColor: material.brandInfo,
            },
            indicatorStyle: {
                backgroundColor: material.brandLight,
            }
        },
    }
);

export const BadgeScreen = createStackNavigator(
    {
        Main: {
            screen: BadgeNavigation,
        },

    }, {
        navigationOptions: {
            title: 'Challenges',
            tabBarIcon: ({focused, tintColor}) => (
                <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
            ),
            headerMode: 'screen'

        },

    }
);
*/