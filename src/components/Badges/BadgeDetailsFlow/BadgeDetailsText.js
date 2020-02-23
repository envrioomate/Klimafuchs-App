import React, {Component, Fragment} from "react";
import { View} from "react-native";

import {Button, Card, CardItem, Container, Content, Icon, Text} from "native-base";
import material from "../../../../native-base-theme/variables/material";
import {LocalizationProvider as L} from "../../../localization/LocalizationProvider";
import {ExternalLinkButton} from "../ExternalLinkButton";
import Markdown from 'react-native-simple-markdown'


export class BadgeDetailsText extends Component {
    render() {
        let {options, navigation, route} = this.props;
        let {badge} = route.params; //
        return (
            <Container style={{
                flex: 4,
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "stretch"
            }}>
                <Container style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "stretch"
                }}>
                    <Content>

                        <Card transparent>

                            <CardItem style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "stretch"
                            }}>
                                <Markdown styles={markdownStyles}>
                                    {badge.challenge.text}
                                </Markdown>
                            </CardItem>
                            {badge.challenge.externalLink ?
                                <CardItem style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    alignItems: "stretch"
                                }}>
                                    <ExternalLinkButton url={badge.challenge.externalLink}/>
                                </CardItem>
                                : null}
                        </Card>



                    </Content>

                    <View transparent style={{height: 64}}>
                        <CardItem>
                            <Button style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                                    onPress={() => {
                                        navigation.navigate("BadgeDetailsCTA", {badge: badge})

                                    }}>
                                <Text>{badge.challenge.hasCompletedText ? badge.challenge.hasCompletedText : L.get("has_completed_text")}</Text>

                                <Icon name='md-checkmark' style={{color: material.brandLight}}/>

                            </Button>
                        </CardItem>
                    </View>
                </Container>

            </Container>
        )
    }
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
}