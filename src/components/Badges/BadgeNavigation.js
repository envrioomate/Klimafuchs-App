import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import AchievementComponent from "./AchievementComponent";
import CurrentBadgesComponent from "./CurrentBadgesComponent";
import BadgeCollectionComponent from "./BadgeCollectionComponent";
import {PersistentScoreHeader} from "./PersistentScoreHeader";


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


function BadgeNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="CurrentTopic"
        >
            <Tab.Screen name="Achievements" component={AchievementComponent}/>
            <Tab.Screen name="CurrentTopic" component={CurrentBadgesComponent}/>
            <Tab.Screen name="BadgeCollection" component={BadgeCollectionComponent}/>

        </Tab.Navigator>
    )
}

export const BadgeScreen = () => {
    return (
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
                header: ({ scene, previous, navigation }) => {
                    const { options } = scene.descriptor;
                    const title =
                        options.headerTitle !== undefined
                            ? options.headerTitle
                            : options.title !== undefined
                            ? options.title
                            : scene.route.name;

                    return (
                        <PersistentScoreHeader options={options} navigation={navigation}/>
                    );
                }
            }}
        >
            <Stack.Screen name="Foo" component={BadgeNavigation}

            />
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
*/