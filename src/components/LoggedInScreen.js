import React from 'react';
import {Icon} from "native-base";

import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {FeedNavigation} from "./Feed/FeedScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import NotificationsScreen from "./Notifications/NotificationsScreen";
import TeamsNav from "./Competitve"
import material from '../../native-base-theme/variables/material';
import {BadgeScreen} from "./Badges/BadgeNavigation";


const Tab = createMaterialBottomTabNavigator();

export const AppNav = () => {

    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: material.tabBarActiveTextColor,
            inactiveBackgroundColor: '#f0f',
            inactiveTintColor: material.tabBarTextColor,
            barStyle: {backgroundColor: material.tabDefaultBg, height: 50},
        }}
                       initialRouteName="NotificationsTab"
                       headerMode="none"
                       labeled="true"
        >
            <Tab.Screen name="FeedTab"  component={FeedNavigation}
                        options={{
                            title: "News",
                            tabBarIcon: ({focused, tintColor}) => (
                                <Icon name='list' style={{fontSize: 20, color: tintColor}}/>
                            )
                        }}
            />
            <Tab.Screen name="NotificationsTab"  component={NotificationsScreen}
                        options={{
                            title: "Mitteilungen",
                            tabBarIcon: ({focused, tintColor}) => (
                                <Icon name='md-notifications' style={{fontSize: 20, color: tintColor}}/>
                            )

                        }}
            />
            <Tab.Screen name="BadgeTab"  component={BadgeScreen}
                        options={{
                            title: "Thema",
                            tabBarIcon: ({focused, tintColor}) => (
                                <Icon name='md-star' style={{fontSize: 20, color: tintColor}}/>
                            )
                        }}
            />
            <Tab.Screen name="CompetitiveTab" component={TeamsNav}
                        options={{
                            title: "Teams",
                            tabBarIcon: ({focused, tintColor}) => (
                                <Icon name='md-people' style={{fontSize: 20, color: tintColor}}/>
                            )

                        }}
            />
            <Tab.Screen name="ProfileTab"  component={ProfileScreen}
                        options={{
                            title: "Profil",
                            tabBarIcon: ({focused, tintColor}) => (
                                <Icon name='md-person' style={{fontSize: 20, color: tintColor}}/>
                            )

                        }}
            />
        </Tab.Navigator>
    )
};

/*
export const AppNav = createMaterialBottomTabNavigator({
        FeedTab: {
            screen: FeedNavigation
        },
        NotificationsTab: {
            screen: NotificationsScreen
        },
        ChallengeTab: {
            screen: BadgeScreen
        },
        CompetitiveTab: {
            screen: TeamsNav
        },
        ProfileTab: {
            screen: ProfileScreen
        },
    }, {
        initialRouteName: 'ChallengeTab',
        activeTintColor: material.tabBarActiveTextColor,
        inactiveTintColor: material.tabBarTextColor,
        barStyle: {backgroundColor: material.tabDefaultBg, height: 50},
        labeled: true,
        headerMode: 'none',
        headerVisible: false,
    }
);
*/
