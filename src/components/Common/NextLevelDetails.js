import React, {Component} from "react";
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {FSModalContentBase} from "../Common/FSModal";
import {Button, Card, CardItem, H1, Icon, Left, Right, Body, Text, Title} from "native-base";
import material from "../../../native-base-theme/variables/material";
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";
import {Score} from "../Common/Score";
import {Env, Util} from "../../util";


export class NextLevelDetails extends FSModalContentBase {


    render() {

        let {levelData, score, requestModalClose} = this.props;


        let {icon, name, maxScore} = levelData;
        console.log(levelData, score, {url: `${Env.API_IMG_URL}${icon.path}`})

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
                    <View style={{backgroundColor: material.levelIconBackground, ...styles.collected}}>
                        <Image style={{backgroundColor: material.levelIconBackground, ...styles.collectedIcon}}
                               source={{uri: `${Env.API_IMG_URL}${icon.path}`}}
                               resizeMode="contain"
                        />
                    </View>
                    </Body>
                </CardItem>
                <CardItem>
                <Body>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{flex: 1, flexWrap: "wrap", textAlign: 'center', marginTop: 0}}>
                            Herzlichen Glückwunsch!
                            {'\n'}
                            Du hast die nächste Entwicklungsstufe
                            {'\n'}
                            {name}
                            {'\n'}
                            in rot erreicht.
                            {'\n'}
                            Weiter so!
                            {'\n'}
                            Bis zur nächsten Entwickungsstufe fehlen dir noch {maxScore+1-score} <Score/>
                        </Text>
                    </View>
                </Body>
                </CardItem>
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
        overflow: "hidden",
        borderColor: '#000',
        borderWidth: 3,

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

