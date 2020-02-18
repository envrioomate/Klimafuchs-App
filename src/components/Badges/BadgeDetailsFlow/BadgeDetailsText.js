import React, {Component, Fragment} from "react";
import {Body, Button, Card, CardItem, Container, Icon, Text} from "native-base";
import * as WebBrowser from "expo-web-browser";
import material from "../../../../native-base-theme/variables/material";
import {LocalizationProvider as L} from "../../../localization/LocalizationProvider";
import {ExternalLinkButton} from "../ExternalLinkButton";

export class BadgeDetailsText extends Component {
    render() {
        let {options, navigation, route} = this.props;
        let {badge} = route.params; //
        return (
            <Fragment>
                <Container>
                    <Body style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Card transparent>

                            <CardItem>
                                <Text>{badge.challenge.text}</Text>
                            </CardItem>
                            <CardItem style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "stretch"}}>
                                <ExternalLinkButton url={badge.challenge.externalLink}/>
                            </CardItem>
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
                    </Body>
                </Container>
            </Fragment>
        )
    }
}