import React from 'react';
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
        <Tab.Navigator
            initialRouteName="BadgeTab"
            headerMode="none"
            activeTintColor="material.tabBarActiveTextColor"
            inactiveTintColor="material.tabBarTextColor"
            barStyle={{backgroundColor: material.tabDefaultBg, height: 50}}
            labeled="true"
        >
            <Tab.Screen name="FeedTab" component={FeedNavigation}/>
            <Tab.Screen name="NotificationsTab" component={NotificationsScreen}/>
            <Tab.Screen name="BadgeTab" component={BadgeScreen}/>
            <Tab.Screen name="CompetitiveTab" component={TeamsNav}/>
            <Tab.Screen name="ProfileTab" component={ProfileScreen}/>
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
