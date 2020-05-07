import React, {Component} from "react";
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {FSModalContentBase} from "../../Common/FSModal";
import {Button, Card, CardItem, H1, Icon, Left, Right, Body, Text, Title} from "native-base";
import material from "../../../../native-base-theme/variables/material";
import {LocalizationProvider as L} from "../../../localization/LocalizationProvider";
import {
    completionLevelToAbbreviatedString,
    completionLevelToColor,
    completionLevelToFriendlyString
} from "../BadgeUtils";
import {Score} from "../../Common/Score";
import {ExternalLinkButton} from "../ExternalLinkButton";


export class CollectedBadgeDetails extends FSModalContentBase {


    render() {
        const {requestModalClose, completion} = this.props;
        console.log(completion)
        const {icon, score, externalLink} = completion.seasonPlanChallenge.challenge;
        const name = completion.seasonPlanChallenge.challenge.title || completion.seasonPlanChallenge.challenge.name;
        const level = completionLevelToAbbreviatedString(completion)
        const iconTint = completionLevelToColor(completion);
        return (

            <Card style={{
                margin: '10%',
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                height: "auto",
                backgroundColor: material.containerBgColor,
            }}
            >
               <CardItem>
                    <Left>
                        <Button style={{right: 0}} info onPress={() => {
                            requestModalClose();
                        }}>
                            <Icon style={{color: material.brandLight}} name="md-close"/>
                        </Button>
                    </Left>
                   <View style={{flex:5,
                       justifyContent: 'flex-start',
                       alignItems: 'flex-start',}}>
                   <H1>
                       {name}
                   </H1>
                   </View>
                </CardItem>
                <CardItem>
                    <Body style={{flex:1,
                        justifyContent: 'center',
                        alignItems: 'center',}}>
                    <View style={{backgroundColor: iconTint, ...styles.collected}}>
                        <Image style={{backgroundColor: iconTint, ...styles.collectedIcon}}
                               source={icon ? {uri: icon.url + '?date=' + (new Date()).getHours()} : require('../../../../assets/image_select.png')}
                               resizeMode="contain"
                        />
                    </View>
                    </Body>
                </CardItem>
                <CardItem>
                <Body>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{flex: 1, flexWrap: "wrap", textAlign: 'center', marginTop: 0}}>
                            Du hast das Abzeichen
                            {'\n'}
                            {name}
                            {'\n'}
                            in {level}{completion.seasonPlanChallenge.challenge.quantityName ? ` (mit ${completion.challengeCompletionQuantity} ${completion.seasonPlanChallenge.challenge.quantityName})`: ""}
                            {'\n'}
                            für {score} <Score/>
                            {'\n'}
                            abgeschlossen!
                        </Text>
                    </View>
                </Body>
                </CardItem>
                { externalLink && <CardItem>
                    <Body style={{flex: 1, flexDirection: 'row-reverse'}}>
                        <ExternalLinkButton url={externalLink}/>
                    </Body>
                </CardItem> }
            </Card>
        );
    }


}

const styles = StyleSheet.create({
    collected: {
        width: (Dimensions.get('window').width / 3) - 10,
        height: (Dimensions.get('window').width / 3) - 10,
        borderRadius: 5,
        padding: 10,
        overflow: "hidden"
    },
    collectedIcon: {
        width: (Dimensions.get('window').width / 3) - 30,
        height: (Dimensions.get('window').width / 3) - 30,
    },
    modal: {
        backgroundColor: 'rgba(0,0,0,0)',
        margin: '5%',
    },
});

