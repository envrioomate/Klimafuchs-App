import React, {Component, Fragment} from "react";
import {Body, Button, Container, Left, Right, Text} from "native-base";
import material from "../../../../native-base-theme/variables/material";

export class BadgeDetailsSelectAchievements extends Component {
    render() {
        let {options, navigation, route} = this.props;
        let {badge} = route.params; //
        return (
            <Fragment>
                <Container transparent style={{backgroundColor: material.brandInfo}}>
                    <Left/>
                    <Body>
                        <Text>Achievments</Text>
                        <Button onPress={() => {
                            navigation.navigate("Main", {badge: badge})

                        }}>
                            <Text>Click Me!</Text>

                        </Button>
                    </Body>
                    <Right/>
                </Container>
            </Fragment>
        )
    }
}