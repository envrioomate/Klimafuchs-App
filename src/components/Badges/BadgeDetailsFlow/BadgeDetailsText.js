import React, {Component, Fragment} from "react";
import {Body, Button, Card, CardItem, Container, Content, Icon, Text} from "native-base";
import material from "../../../../native-base-theme/variables/material";
import {LocalizationProvider as L} from "../../../localization/LocalizationProvider";
import {ExternalLinkButton} from "../ExternalLinkButton";
import Markdown from 'react-native-simple-markdown'
import {StyleSheet, View} from "react-native";


export class BadgeDetailsText extends Component {
    render() {
        let {options, navigation, route} = this.props;
        let {badge} = route.params; //
        return (
            <Fragment>
                <Container style={{flex:11,justifyContent: "space-between", alignItems: "stretch"}}>

                        <Content >
                            <Body style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                <Card transparent>
                                    <CardItem>
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

                            </Body>
                        </Content>

                    <Card transparent style={{flex:1,justifyContent: "flex-end", alignItems: "stretch"}}>
                        <CardItem>
                            <Text>{L.get("has_completed_text")}</Text>
                        </CardItem>
                        <CardItem>
                            <Button style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                                    onPress={() => {
                                        navigation.navigate("BadgeDetailsCTA", {badge: badge})

                                    }}>
                                <Icon name='md-checkmark' style={{color: material.brandLight}}/>
                            </Button>
                        </CardItem>
                    </Card>
                </Container>
            </Fragment>
        )
    }
}


const markdownStyles = {
    heading1: {
        fontSize: 24,
        color: 'purple',
    },
    link: {
        color: 'pink',
    },
    mailTo: {
        color: 'orange',
    },
    text: {
        color: '#555555',
    },
}