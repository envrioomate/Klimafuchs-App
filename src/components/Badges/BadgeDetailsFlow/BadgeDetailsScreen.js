import React from "react";
import {Image} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";
import {createStackNavigator} from "@react-navigation/stack";
import Constants from "expo-constants";
import {BadgeDetailsSelectAchievements} from "./BadgeDetailsSelectAchievements";
import {BadgeDetailsCompletion} from "./BadgeDetailsCompletion";
import {BadgeDetailsText} from "./BadgeDetailsText";
import {BadgeDetailsCTA} from "./BadgeDetailsCTA";

const Stack = createStackNavigator();

const BadgeDetailsScreen = () => {
    console.log(Constants.statusBarHeight);

    return (
        <Stack.Navigator
            screenOptions={{
                header: ({scene, previous, navigation}) => {
                    const {options} = scene.descriptor;
                    const {badge} = scene.route.params
                    const title =
                        options.headerTitle !== undefined
                            ? options.headerTitle
                            : options.title !== undefined
                            ? options.title
                            : scene.route.name;

                    return (
                        <Header style={{
                            paddingTop: Constants.statusBarHeight + 24,
                            paddingBottom: 32,

                        }}>
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
                                <Image style={{width: 32, height: 32}}
                                       source={badge.challenge.icon ? {uri: badge.challenge.icon.url} : require('../../../../assets/image_select.png')}/>

                            </Right>
                        </Header>
                    );
                }
            }}
        >
            <Stack.Screen name="BadgeDetailsText" component={BadgeDetailsText}/>
            <Stack.Screen name="BadgeDetailsCTA" component={BadgeDetailsCTA}/>
            <Stack.Screen name="BadgeDetailsCompletion" component={BadgeDetailsCompletion}/>
            <Stack.Screen name="BadgeDetailsSelectAchievments" component={BadgeDetailsSelectAchievements}/>

        </Stack.Navigator>
    )
};


export default BadgeDetailsScreen;