import React, {Component, Fragment} from "react";
import {Body, Button, Container, Left, Right, Spinner, Text} from "native-base";
import material from "../../../../native-base-theme/variables/material";
import {Image, View} from "react-native";
import {LocalizationProvider as L} from "../../../localization/LocalizationProvider";
import {completionLevelToColor} from "../BadgeUtils";

export class BadgeDetailsCompletion extends Component {
    render() {
        let {options, navigation, route} = this.props;
        let {badge, completion} = route.params; //
        console.log("Completion: ", completion);
        return (
            <Fragment>
                <Container transparent >
                    <Body style={{flex:1}}>
                        <Text>{L.get("badge_acquired")}</Text>
                        <Image style={{width: 400, height: 400, tintColor: completionLevelToColor(completion)}}
                               source={badge.challenge.icon ? {uri: badge.challenge.icon.url + '?date=' + (new Date()).getHours()} : require('../../../../assets/image_select.png')}/>
                        <Text>{L.get("badge_acquired_hint")}</Text>

                    </Body>
                    <Text style={{marginLeft: 10}}>{L.get("select_achievements_hint")}</Text>

                    <View style={{backgroundColor: '#fff', width: "100%", height: 64}}>

                        <Button
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                margin: 10,
                                width: "95%",
                                height: 200
                            }}
                            onPress={async () => {
                                navigation.navigate("BadgeDetailsSelectAchievements", {badge: badge})

                            }}>
                            <Text>{L.get("select_achievements")}</Text>

                        </Button>

                    </View>
                </Container>
            </Fragment>
        )
    }
}