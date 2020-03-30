import React from "react";
import {Image} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";
import {createStackNavigator} from "@react-navigation/stack";
import {BadgeDetailsSelectAchievements} from "./BadgeDetailsSelectAchievements";
import {BadgeDetailsCompletion} from "./BadgeDetailsCompletion";
import {BadgeDetailsText} from "./BadgeDetailsText";
import BadgeDetailsCTA from "./BadgeDetailsCTA";
import {BadgeIcon, badgeScreenStyles, completionLevelToColor} from "../BadgeUtils";

const Stack = createStackNavigator();

const BadgeDetailsScreen = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                header: ({scene, previous, navigation}) => {
                    const {options} = scene.descriptor;
                    let {badge, completion} = scene.route.params;
                    completion = completion || badge.challengeCompletion;
                    const title =
                        options.headerTitle !== undefined
                            ? options.headerTitle
                            : options.title !== undefined
                            ? options.title
                            : scene.route.name;

                    return (
                        <Header>
                            <Left>
                                <Button transparent
                                        onPress={() => navigation.goBack()}>
                                    <Icon name='arrow-back'/>
                                </Button>
                            </Left>
                            <Body>
                                <Title>{badge.challenge.title}</Title>
                            </Body>
                            <Right>
                                <BadgeIcon badgeIcon={badge.challenge.icon} bgColor={completionLevelToColor(completion)}/>
                            </Right>
                        </Header>
                    );
                }
            }
            }
        >
            <Stack.Screen name="BadgeDetailsText" component={BadgeDetailsText}/>
            <Stack.Screen name="BadgeDetailsCTA" component={BadgeDetailsCTA}/>
            <Stack.Screen name="BadgeDetailsCompletion" component={BadgeDetailsCompletion}/>
            <Stack.Screen name="BadgeDetailsSelectAchievements" component={BadgeDetailsSelectAchievements}/>

        </Stack.Navigator>
    )
};


export default BadgeDetailsScreen;