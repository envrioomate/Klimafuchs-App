import React from 'react';
import {View} from 'react-native';
import {Icon,} from "native-base";
import FeedComponent from './FeedComponent';
import NewPostComponent from './NewPostComponent';
import PostScreen from './PostScreen';
import {createStackNavigator} from "@react-navigation/stack";

export const defaultAvatar = (process.env.API_IMG_URL || "https://enviroommate.org/app-dev/img/") + "avatar_default.png"; //TODO replace default avatar with local file

const Stack = createStackNavigator();

export const FeedNavigation = () => {
    return (
        <Stack.Navigator
            headerMode="none"
            options={{
            title: 'News',
            tabBarIcon: ({focused, tintColor}) => (
                <Icon name='md-home' style={{fontSize: 20, color: tintColor}}/>
            ),

        }}>
            <Stack.Screen name="Feed" component={FeedComponent}/>
            <Stack.Screen name="Post" component={PostScreen}/>
            <Stack.Screen name="NewPost" component={NewPostComponent}/>
        </Stack.Navigator>
    )
};
/*
export const FeedNavigation = createStackNavigator({
    Feed: {
        screen: FeedComponent
    },
    Post: {
        screen: PostScreen
    },
    NewPost: {
        screen: NewPostComponent
    }
}, {
    navigationOptions: {
        title: 'News',

        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='md-home' style={{fontSize: 20, color: tintColor}}/>
        ),
    },
    initialRouteName: 'Feed',
    headerMode: 'none'
});
*/



