import React from "react";
import {Content, Container, Text, H1} from "native-base";
import Markdown from "react-native-easy-markdown";
import material from "../../../native-base-theme/variables/material";
import * as Meta from "../../../app.json"
export const AboutScreen = () => {
    let appVersion = Meta.expo.version.toString();
    console.log({appVersion})
    return (
        <Container>
        <Content>
            <Markdown style={markdownStyles}>
                {
                   "Klimaschutz For All App\n" +
                   "===================== \n" +
                   "\n" +
                   `Version: ${appVersion}\n` +
                   "\n" +
                   "Herausgegeben von: \n" +
                   "\n" +
                   "Klimaschutz For All e. V.\n" +
                   "Ritterhuder Str. 23\n" +
                   "28237 Bremen\n" +
                   "\n" +
                   "[**Klimaschutz4all.com**](https://www.klimaschutz4all.com/)\n" +
                   "\n" +
                   "In zusammenarbeit mit \n" +
                   "[**Klimafuchs.org**](https://www.klimafuchs.org/)\n" +
                   "\n" +
                   "Lizenzen\n" +
                   "***Klimaschutz For All** verwendet tolle freie Software und Creative Commons Werke:*\n" +
                   "\n" +
                   "[Apollo GraphQL ](https://www.apollographql.com/)\n" +
                   "von Meteor Development Group, Inc. unter *MIT License*\n" +
                   "\n" +
                   "[Axios](https://github.com/axios/axios)\n" +
                   "von Matt Zabriskie unter *MIT License*\n" +
                   "\n" +
                   "[Expo](https://expo.io)\n" +
                   "von 650 Industries, Inc unter *MIT License*\n" +
                   "\n" +
                   "[React Native](https://reactnative.dev/)\n" +
                   "von Facebook, Inc. and its affiliates unter *MIT License*\n" +
                   "\n" +
                   "[Redux](https://redux.js.org/) \n" +
                   "von Dan Abramov unter *MIT License*\n" +
                   "\n" +
                   "[Moment.js](https://momentjs.com/)\n" +
                   "von JS Foundation unter *MIT License*\n" +
                   "\n" +
                   "[Native Base](https://nativebase.io/) \n" +
                   "von GeekyAnts unter *Apache License 2.0*\n" +
                   "\n" +
                   "[React Native Easy Markdown](https://github.com/TitanInvest/react-native-easy-markdown/)\n" +
                   "von Juuso Lappalainen, Zach Ivester Ltd unter *MIT License*\n" +
                   "\n" +
                   "[Validate.js](http://validatejs.org/)\n" +
                   "von Meniga Ltd unter *MIT License*\n" +
                   "\n"
                }

            </Markdown>
        </Content>
        </Container>
    )
}

const markdownStyles = {
    heading1: {
        fontSize: 24,
        color: 'purple',
    },
    link: {
        color: "#00f",
        textDecorationLine: 'underline'
    },
    mailTo: {
        color: 'orange',
    },
    text: {
        color: material.textLight,
    },
    padding: 10,
}