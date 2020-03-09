import React, {Fragment} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import {AboutScreen} from "./AboutScreen";
import {Icon} from "native-base";
const Stack = createStackNavigator();

export const ProfileNav = () => {
    return (
        <Stack.Navigator
            headerMode="screen"
            defaultRouteName="Profile"
        >
            <Stack.Screen name="Profile" component={ProfileScreen}  options={{
                headerShown: false
            }}/>
            <Stack.Screen name="About" component={AboutScreen}   options={{
                title: "Über die App",
                headerStyle: {
                    height: 64,
                },
                headerTitleStyle: {
                    fontWeight: "normal"
                }
            }}/>
        </Stack.Navigator>
    )
};
