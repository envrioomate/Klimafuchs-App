import React, {Component, Fragment} from "react";
import {Body, Button, Container, Text} from "native-base";
import material from "../../../../native-base-theme/variables/material";
import * as WebBrowser from "expo-web-browser";

export class BadgeDetailsText extends Component {
    render() {
        let {options, navigation, route} = this.props;
        let {badge} = route.params; //
        return (
            <Fragment>
                <Container transparent style={{backgroundColor: material.brandInfo}}>
                    <Body>
                        <Text>{badge.challenge.text}</Text>
                        <Button onPress={async () => {
                            let result = await WebBrowser.openBrowserAsync(badge.challenge.externalLink);
                        }}>
                            <Text>{badge.challenge.externalLink}</Text>
                        </Button>
                        <Button onPress={() => {
                            navigation.navigate("BadgeDetailsCTA", {badge: badge})

                        }}>
                            <Text>Click Me!</Text>
                        </Button>
                    </Body>
                </Container>
            </Fragment>
        )
    }
}