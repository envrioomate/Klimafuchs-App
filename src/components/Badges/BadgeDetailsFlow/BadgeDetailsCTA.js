import React, {Component} from "react";
import {Image, StyleSheet, TextInput, View, Platform} from "react-native";
import {Body, Button, Card, CardItem, Container, Content, Icon, Footer, Left, Right, Spinner, Text} from "native-base";
import material from "../../../../native-base-theme/variables/material";
import {ChallengeGoalCompletionLevel} from "../BadgePreviewListComponent";
import {Mutation} from "react-apollo";
import {
    COMPLETE_CHALLENGE,
    COMPLETED_BADGES, CURRENT_BADGES,
    CURRENTLY_SELECTED_ACHIEVEMENTS,
    GET_SCORE
} from "../../../network/Badges.gql";
import {LocalizationProvider as L} from "../../../localization/LocalizationProvider";
import {BadgeIcon, badgeScreenStyles, completionLevelToColor} from "../BadgeUtils";
import {GET_TEAM, MY_MEMBERSHIPS} from "../../../network/Teams.gql";
import {connect} from "react-redux";

const inRange = (x, min, max) => {
    return x > min && x <= max;
};

const levelCompleted = (badgeGoalType, AscLowerBound, AscUpperBound, DscLowerBound, DSCUpperBound, quantity) => {
    if (quantity == "") return false; // expected coersion to check for "" in input box
    let result = badgeGoalType === "QUANTITY_ASC" ?
        inRange(quantity, AscLowerBound, AscUpperBound)
        : inRange(quantity, DscLowerBound, DSCUpperBound);
    return result;
};


export class BadgeDetailsCTA extends Component {
    state = {
        loading: false,
        completionLevel: null,
        completionState: {
            minCompleted: false, medCompleted: false, goodCompleted: false, maxCompleted: false
        },
        enteredQuantity: null,
        inputFocused: false
    };

    iconMinColor = material.completionMin;
    iconMedColor = material.completionMed;
    iconGoodColor = material.completionGood;
    iconMaxColor = material.completionMax;

    RenderCompletionOption = ({optionText, optionQuantity, autoCompleted, icon, iconTint, quantityName, orderASC, completionLevel}) => {
        let isCompleted = completionLevel === this.state.completionLevel;
        return (
                <CardItem style={autoCompleted ? {backgroundColor: '#b5c5b5'} : {}}
                          button={!optionQuantity}
                          onPress={() => {
                              if (this.state.completionLevel !== completionLevel)
                                  this.setState({completionLevel});
                              else this.setState({completionLevel: null});
                          }}
                >
                    <Left>
                        <Icon name='md-checkmark' style={isCompleted ? {
                            color: material.brandLight,
                            backgroundColor: material.brandSuccess, ...badgeScreenStyles.checkmark
                        } : badgeScreenStyles.checkmark}/>
                    </Left>
                    <Body style={{
                        flex: 4,
                        flexDirection: "column", justifyContent: "flex-start", alignItems: "stretch"
                    }}>
                        <Text
                            style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "stretch"}}>
                            {optionText}
                            {optionQuantity && quantityName ? <Text style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "flex-end"
                            }}>{` (${orderASC ? 'ab' : 'bis'} ${optionQuantity} ${quantityName})`}</Text> : null}
                        </Text>

                    </Body>
                    <Right>
                        <BadgeIcon bgColor={isCompleted ? iconTint : "#aaa"} badgeIcon={icon} />
                    </Right>
                </CardItem>
        )
    };

    onChangeQuantity = (badgeGoals, quantity) => {
        let {
            minQuantity,
            medQuantity,
            goodQuantity,
            maxQuantity,
            badgeGoalType,
        } = badgeGoals;


        quantity = quantity.replace(',', '.');

        let minCompleted = levelCompleted(badgeGoalType, Number.NEGATIVE_INFINITY, medQuantity,  medQuantity, Number.POSITIVE_INFINITY,quantity);
        let medCompleted = levelCompleted(badgeGoalType, medQuantity, goodQuantity, goodQuantity, medQuantity,  quantity);
        let goodCompleted = levelCompleted(badgeGoalType, goodQuantity, maxQuantity, maxQuantity,goodQuantity,  quantity);
        let maxCompleted = levelCompleted(badgeGoalType, maxQuantity, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, maxQuantity,  quantity);
        console.log(badgeGoalType, minCompleted, medQuantity, goodQuantity, maxQuantity, quantity)
        let completionLevel =
            minCompleted ? ChallengeGoalCompletionLevel.MIN :
                medCompleted ? ChallengeGoalCompletionLevel.MED :
                    goodCompleted ? ChallengeGoalCompletionLevel.GOOD :
                        maxCompleted ? ChallengeGoalCompletionLevel.MAX : null;

        this.setState({
            enteredQuantity: quantity,
            completionState: {
                minCompleted, medCompleted, goodCompleted, maxCompleted
            },
            completionLevel: completionLevel
        });
    };

    renderQuatitative = (challenge, quantity) => {
        let {
            minCompletion,
            minQuantity,
            medCompletion,
            medQuantity,
            goodCompletion,
            goodQuantity,
            maxCompletion,
            maxQuantity,
            badgeGoalType,
        } = challenge.badgeGoals;
        let {quantityName} = challenge;
        let {minCompleted, medCompleted, goodCompleted, maxCompleted} = this.state.completionState;
        quantity = quantity ||
            (badgeGoalType === "QUANTITY_ASC" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY);
        let orderASC = badgeGoalType === "QUANTITY_ASC";
        console.log("orderASC: ", orderASC);
        return (
            <Content style={{flex: 2, width: "100%"}}>
                <Card transparent style={{flex:2}}>
                    <CardItem>
                        <Body>
                        <TextInput
                            style={{height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, flex:1}}
                            onChangeText={text => this.onChangeQuantity(challenge.badgeGoals, text)}
                            onFocus={e => this.setState({inputFocused: true})}
                            onBlur={e => this.setState({inputFocused: false})}
                            value={this.state.enteredQuantity}
                            keyboardType={ Platform.OS === "android" ? "number-pad" : "numbers-and-punctuation" }
                            textAlign="right"
                            paddingHorizontal={10}
                        />
                        </Body>
                    <Right>
                        <Text>{quantityName}</Text>

                    </Right>
                    </CardItem>
                </Card>
                <Card transparent>
                <this.RenderCompletionOption optionText={minCompletion} optionQuantity={minQuantity}
                                             autoCompleted={minCompleted} icon={challenge.icon}
                                             iconTint={this.iconMinColor}
                                             quantityName={orderASC ? quantityName: null}
                                             orderASC={orderASC}
                                             completionLevel={ChallengeGoalCompletionLevel.MIN}
                />
                <this.RenderCompletionOption optionText={medCompletion} optionQuantity={medQuantity}
                                             autoCompleted={medCompleted} icon={challenge.icon}
                                             iconTint={this.iconMedColor} quantityName={quantityName}
                                             orderASC={orderASC}

                                             completionLevel={ChallengeGoalCompletionLevel.MED}
                />
                <this.RenderCompletionOption optionText={goodCompletion} optionQuantity={goodQuantity}
                                             autoCompleted={goodCompleted} icon={challenge.icon}
                                             iconTint={this.iconGoodColor} quantityName={quantityName}
                                             orderASC={orderASC}

                                             completionLevel={ChallengeGoalCompletionLevel.GOOD}
                />
                <this.RenderCompletionOption optionText={maxCompletion} optionQuantity={maxQuantity}
                                             autoCompleted={maxCompleted} icon={challenge.icon}
                                             iconTint={this.iconMaxColor} quantityName={quantityName}
                                             orderASC={orderASC}

                                             completionLevel={ChallengeGoalCompletionLevel.MAX}
                />
                </Card>
            </Content>

        )
    };

    renderQualitative = (challenge) => {
        let {
            minCompletion,
            medCompletion,
            goodCompletion,
            maxCompletion,
        } = challenge.badgeGoals;

        return (
            <Content style={{flex: 1, width: "100%"}}>
                <this.RenderCompletionOption optionText={minCompletion}
                                             icon={challenge.icon}
                                             iconTint={this.iconMinColor}
                                             completionLevel={ChallengeGoalCompletionLevel.MIN}

                />

                <this.RenderCompletionOption optionText={medCompletion}
                                             icon={challenge.icon}
                                             iconTint={this.iconMedColor}
                                             completionLevel={ChallengeGoalCompletionLevel.MED}
                />

                <this.RenderCompletionOption optionText={goodCompletion}
                                             icon={challenge.icon}
                                             iconTint={this.iconGoodColor}
                                             completionLevel={ChallengeGoalCompletionLevel.GOOD}
                />

                <this.RenderCompletionOption optionText={maxCompletion}
                                             icon={challenge.icon}
                                             iconTint={this.iconMaxColor}
                                             completionLevel={ChallengeGoalCompletionLevel.MAX}
                />

            </Content>
        )
    };


    componentDidMount() {
        let {badge} = this.props.route.params; //
        if (!badge.challengeCompletion) return;
        let currentLevel = badge.challengeCompletion.challengeGoalCompletionLevel;
        let currentQuantity = badge.challengeCompletion.challengeCompletionQuantity;+

        this.setState({
            completionLevel: ChallengeGoalCompletionLevel[currentLevel], //type shenanigans
            enteredQuantity: currentQuantity + ""                        // even worse
        })
    }


    render() {
        let {options, navigation, route, teamId} = this.props;
        let ownTeamId = false
        let {badge} = route.params; //
        let {completionLevel, enteredQuantity} = this.state;
        let isFilledOut = completionLevel !== null;

        let  refetechQueries =
            [
                {query: GET_SCORE},
                 {query: COMPLETED_BADGES},
                  {query: CURRENT_BADGES},
        {query: MY_MEMBERSHIPS },
                ]

        if(teamId) refetechQueries.push({query: GET_TEAM, variables: {teamId}})


        return (
            <Container transparent style={{flex: 1, justifyContent: 'space-between'}}>
                <Body style={{flex: 1, width: "100%", justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text>{L.get("cta_header_text")}</Text>
                    {badge.challenge.badgeGoals.badgeGoalType === "QUALITATIVE" ?
                        this.renderQualitative(badge.challenge)
                        : this.renderQuatitative(badge.challenge, this.state.enteredQuantity)}

                </Body>
                <View style={{backgroundColor: '#fff', width: "100%", height: 64}}>
                    <Mutation mutation={COMPLETE_CHALLENGE}
                              refetchQueries={refetechQueries}>
                        {(completeChallenge, {loading, error, refetch}) => (

                            <Button disabled={!isFilledOut}
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        margin: 10,
                                        width: "95%",
                                        height: 200
                                    }}
                                    onPress={async () => {

                                        this.setState({loading: true});
                                        if(badge.challengeCompletion &&
                                            completionLevel === badge.challengeCompletion.challengeGoalCompletionLevel) {
                                            navigation.navigate("BadgeDetailsCompletion", {badge: badge, completion: badge.challengeCompletion});
                                        }

                                        let completion = await completeChallenge({
                                            variables: {
                                                challengeId: badge.id,
                                                challengeGoalCompletionLevel: completionLevel,
                                                challengeCompletionQuantity: Number.parseFloat(enteredQuantity)
                                            },
                                        }).catch(err => {
                                            this.setState({loading: false});

                                            console.log(err)
                                        });
                                        this.setState({loading: false});

                                        navigation.navigate("BadgeDetailsCompletion", {badge: badge, completion: completion.data.completeChallenge})


                                    }}>
                                {this.state.loading ? <Spinner/> : <Text>Bestätigen!</Text>}

                            </Button>
                        )}
                    </Mutation>
                </View>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {

    console.log({teamId: state.user.teamId})

    return {
        teamId: state.user.teamId
    }
};

export default connect(mapStateToProps)(BadgeDetailsCTA)