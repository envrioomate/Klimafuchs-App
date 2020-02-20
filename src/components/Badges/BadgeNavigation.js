import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import AchievementComponent from "./AchievementComponent";
import CurrentBadgesComponent from "./CurrentBadgesComponent";
import BadgeCollectionComponent from "./BadgeCollectionComponent";
import {PersistentScoreHeader} from "./PersistentScoreHeader";
import BadgeDetailsScreen from "./BadgeDetailsFlow/BadgeDetailsScreen";
import {SeasonProgressComponent} from "./Tree/SeasonProgressComponent";


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


function BadgeNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="CurrentTopic"
        >
            <Tab.Screen name="Achievements" component={AchievementComponent} options={{title: "Achievements"}}/>
            <Tab.Screen name="CurrentTopic" component={CurrentBadgesComponent} options={{title: "Thema"}}/>
            <Tab.Screen name="Tree" component={SeasonProgressComponent} options={{title: "Tree"}}/>
            <Tab.Screen name="BadgeCollection" component={BadgeCollectionComponent} options={{title: "Sammlung"}}/>

        </Tab.Navigator>
    )
}

export const BadgeScreen = () => {
    return (
        <Stack.Navigator
            headerMode="screen"
        >
            <Stack.Screen name="Main" component={BadgeNavigation}
                          options={{
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
            />
            <Stack.Screen name="BadgeDetails"
                          options={{
                              header: ({ scene, previous, navigation }) => {return null},
                          }}
                          component={BadgeDetailsScreen}/>
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