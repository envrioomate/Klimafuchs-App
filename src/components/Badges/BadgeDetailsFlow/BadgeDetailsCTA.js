import React, {Component, Fragment} from "react";
import {Image, TextInput, View} from "react-native";
import {Body, Button, Container, Content, Left, Right, Icon, Text, Card, CardItem, Header} from "native-base";
import material from "../../../../native-base-theme/variables/material";

const inRange = (x, min, max) => {
    return x >= min && x <= max;
}

const levelCompleted = (badgeGoalType, AscLowerBound, AscUpperBound,DscLowerBound, DSCUpperBound, quantity) => {
    return badgeGoalType === "QUANTITATIVE_ASC" ?
        inRange(quantity, AscLowerBound, AscUpperBound)
        : inRange(quantity, DscLowerBound, DSCUpperBound);

}



export class BadgeDetailsCTA extends Component {
    state = {
        completionLevel: null,
        enteredQuantity: null
    };

    RenderCompletionOption = ({optionText, optionQuantity, autoCompleted, icon, iconTint}) => {
        return (
            <Card style={{flex:1}}>
                <CardItem style={{backgroundColor: autoCompleted ? '#0f0' : material.brandLight}}>
                    <Text>{optionText}{optionQuantity ? optionQuantity : ""}</Text>
                    <Right>
                        <Image style={{width: 32, height: 32}}
                               source={icon ? {uri: icon.url} : require('../../../../assets/image_select.png')}/>

                    </Right>
                </CardItem>
            </Card>
        )
    };

    onChangeQuantity = (quantity) => {
        console.log("New quantity: ", quantity)
    };

    renderQuatitative = (challenge) => {
        let {
            minCompletion,
            minQuantity,
            medCompletion,
            medQuantity,
            goodCompletion,
            goodQuantity,
            maxCompletion,
            maxQuantity,
            badgeGoalType
        } = challenge.badgeGoals;
        let quantity = this.state.enteredQuantity ||
            (badgeGoalType === "QUANTITATIVE_ASC" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY);

        let minCompleted = levelCompleted(badgeGoalType,minQuantity, medQuantity, Number.POSITIVE_INFINITY, minQuantity, quantity);
        let medCompleted = levelCompleted(badgeGoalType,medQuantity, goodQuantity, minQuantity, medQuantity, quantity);
        let goodCompleted = levelCompleted(badgeGoalType,goodQuantity, maxQuantity, medQuantity, goodQuantity, quantity);
        let maxCompleted = levelCompleted(badgeGoalType,maxQuantity, Number.POSITIVE_INFINITY, goodQuantity, maxQuantity, quantity);

        return (
            <Content>
                <Card>
                    <CardItem>

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={text => this.onChangeQuantity(text)}
                    value={this.state.enteredQuantity}
                />
                    </CardItem>
                </Card>
                <this.RenderCompletionOption optionText={minCompletion} optionQuantity={minQuantity} autoCompleted={minCompleted}/>
                <this.RenderCompletionOption optionText={medCompletion} optionQuantity={medQuantity} autoCompleted={medCompleted}/>
                <this.RenderCompletionOption optionText={goodCompletion} optionQuantity={goodQuantity} autoCompleted={goodCompleted}/>
                <this.RenderCompletionOption optionText={maxCompletion} optionQuantity={maxQuantity} autoCompleted={maxCompleted}/>

            </Content>

        )
    };

    renderQualitative = (challenge) => {
        let {
            minCompletion,
            minQuantity,
            medCompletion,
            medQuantity,
            goodCompletion,
            goodQuantity,
            maxCompletion,
            maxQuantity
        } = challenge.badgeGoals;

        return (
            <Fragment>
                <Text>Qualitative</Text>
                <this.RenderCompletionOption optionText={minCompletion} />
                <this.RenderCompletionOption optionText={medCompletion} />
                <this.RenderCompletionOption optionText={goodCompletion} />
                <this.RenderCompletionOption optionText={maxCompletion}/>
            </Fragment>
        )
    };


    render() {
        let {options, navigation, route} = this.props;
        let {badge} = route.params; //
        return (
                <Container transparent style={{flex:1}}>
                    <Body style={{flex:1}}>
                        <Text>CTA</Text>
                        {badge.challenge.badgeGoals.badgeGoalType === "QUALITATIVE" ? this.renderQualitative(badge.challenge) : this.renderQuatitative(badge.challenge)}

                        <Button onPress={() => {
                            navigation.navigate("BadgeDetailsCompletion", {badge: badge})

                        }}>
                            <Text>Click Me!</Text>

                        </Button>
                    </Body>
                </Container>
        )
    }
}