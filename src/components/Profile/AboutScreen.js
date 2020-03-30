import React from "react";
import {Content, Container, Text, H1} from "native-base";
import Markdown from "react-native-easy-markdown";
import material from "../../../native-base-theme/variables/material";
import * as Meta from "../../../app.json"
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";
export const AboutScreen = () => {
    let appVersion = Meta.expo.version.toString();
    console.log({appVersion})
    return (
        <Container>
        <Content>
            <Markdown style={markdownStyles}>
                {
                  L.get("about",{appVersion})
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