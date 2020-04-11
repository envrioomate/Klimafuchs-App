import React, {Component} from "react";
import {Animated, StyleSheet, View} from "react-native";
import {Body, Button, Card, CardItem, H1, Title, Text, Left, Right, Icon} from "native-base";
import Svg, {Path} from 'react-native-svg';
import {COMPLETE_ACHIEVEMENT, CURRENTLY_SELECTED_ACHIEVEMENTS, GET_SCORE} from "../../../network/Badges.gql";
import {Mutation} from "react-apollo";
import {ExternalLinkButton} from "../ExternalLinkButton";
import {CompleteAchievementButton} from "./CompleteAchievementButton";
import {Score} from "../../Common/Score";

import moment from 'moment/min/moment-with-locales';
import de from 'moment/locale/de';
import * as Animatable from 'react-native-animatable';

import {LocalizationProvider as L} from "../../../localization/LocalizationProvider";
import material from "../../../../native-base-theme/variables/material";

moment.locale('de');
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const AnimatedCard = Animated.createAnimatedComponent(Card)
const AnimatedCardItem = Animated.createAnimatedComponent(CardItem)

const HoldButtonHint = ({top}) => {
    return (
        <Animatable.View animation="fadeInUp" duration={800} style={{
            position: "absolute",
            top: top,
            left: "10%",
            width: "80%",
            height: "20%",
            backgroundColor: "white",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Text>
                Halt mich!
            </Text>
        </Animatable.View>
    )
}

export class AnimatedAchievementContainer extends Component {

    heldActionValue;
    heldActionCompleted;
    currentHeightValue;
    state = {
        hasCompletedText: "Animation Complete!",
        hasCompleted: false,
        heldActionProgress: new Animated.Value(0),
        heldActionCompleted: new Animated.Value(0),
        collapsedHeight: 0,
        currentHeight: new Animated.Value(0),
        expandedHeight: 0,
        viewWidth: 0,
        viewHeight: 0,
        colors: ['rgba(108,156,46,0)', 'rgba(108,156,46,0.12)'],
        duration: 2000,
        loading: false,
        collapsed: true,
        animatingHeight: false,
        showHint: false,
        reshowHint: true
    };

    async componentDidMount() {
        this.heldActionValue = 0;
        this.heldActionCompleted = 0;
        this.state.currentHeight.addListener((e) => this.currentHeightValue = e.value);
        this.state.heldActionProgress.addListener((e) => this.heldActionValue = e.value);
        this.state.heldActionCompleted.addListener((e) => this.heldActionCompleted = e.value);
    };

    onPressIn = (e, duration, id, achievement, completeAchievement) => {
        console.log("Press started!", e.nativeEvent.locationX, e.nativeEvent.locationY);
        Animated.timing(this.state.heldActionProgress, {
            duration: duration,
            toValue: 1
        }).start(() => this.onActionComplete(id, achievement, completeAchievement))
    };

    onPressOut = (e, duration) => {
        console.log("Press stopped!");
        if (this.state.hasCompleted) return;
        this.setState({showHint: this.state.reshowHint, reshowHint: false});
        setTimeout(() => {
            this.setState({showHint: false, reshowHint: true});
        }, 2500)
        Animated.timing(this.state.heldActionProgress, {
            duration: this.heldActionValue * duration,
            toValue: 0
        }).start()
    };

    onActionComplete = async (id, achievement, completeAchievement) => {
        console.log("Action triggered!");

        if (this.heldActionValue === 1) {
            this.setState({hasCompleted: true});

            this.setState({loading: true});
            console.log(achievement.name)
            let completion = await completeAchievement({
                variables: {
                    achievementSelectionId: id,
                },
            }).catch(err => {
                this.setState({loading: false});

                console.log(err)
            });
            this.setState({
                loading: false,
            });
        }
    };


    setExpandedHeight(e) {
        this.setState({
            expandedHeight: e.nativeEvent.layout.height + 100
        });
    }


    toggleExpand = () => {
        if (this.state.animatingHeight) return;
        this.setState({animatingHeight: true})
        let initialHeight = this.state.collapsed ? 0 : 1;
        let finalHeight = this.state.collapsed ? 1 : 0;

        this.state.currentHeight.setValue(initialHeight);
        Animated.timing(this.state.currentHeight, {
            toValue: finalHeight,
            duration: 200,

        }).start(() => {
            this.setState({collapsed: !this.state.collapsed, animatingHeight: false})
        });
    };

    getHeight = () => {
        let currentHeight = this.state.currentHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.state.expandedHeight]
        });
        return {height: currentHeight};
    };

    getIconRotation = () => {
        let currentRot = this.state.currentHeight.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg']
        });
        return {
            transform: [
                {rotate: currentRot},
            ]
        };
    };


    getProgressStyles = () => {
        let width = this.state.heldActionProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.state.viewWidth]
        });
        let color = this.getAnimatedColor();

        return {
            width: width,
            height: this.state.viewHeight,
            backgroundColor: color
        }
    };

    getCardBorderStyle = () => {
        let color = this.state.heldActionProgress.interpolate({
            inputRange: [0, 1],
            outputRange: ['#b5b5b5', '#6C9C2E']
        });

        return {
            borderColor: color,

        }
    };


    getAnimatedColor = () => {
        let color = this.state.heldActionProgress.interpolate({
            inputRange: [0, 1],
            outputRange: this.state.colors
        });

        return color;
    };

    getStrokeOffset = () => {
        let offset = this.state.heldActionProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [400, 800]
        });

        return offset;
    };


    render() {
        const {achievementSelection} = this.props;

        let {id, achievement, achievementCompletions, timeOutDate} = achievementSelection;
        console.log(achievementCompletions);
        let achievementWasCompleted = achievementCompletions.length > 0 && achievementCompletions[0].achievementCompletionType === "COMPLETED";
        let achievementWasFailed = (achievementCompletions.length > 0 && achievementCompletions[0].achievementCompletionType === "TIMED_OUT");

        let timeOutDateString = `Läuft ab ${moment(timeOutDate).fromNow()} (${moment(timeOutDate).format("Do MMMM YYYY")})`;

        const {hasCompleted, hasCompletedText, duration} = this.state;

        return (
            <Animated.View style={achievementWasCompleted || achievementWasFailed ? {
                width: "95%",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: achievementWasCompleted ? '#6C9C2E' : 'lightgrey',
                margin: 10,
                backgroundColor: achievementWasCompleted ? 'rgba(108,156,46,0.12)' : 'rgba(156,0, 0,0.12)'
            } : {
                backgroundColor: this.getAnimatedColor(), width: "95%", borderRadius: 10, borderWidth: 1,
                margin: 9, ...this.getCardBorderStyle(),
            }}>

                <AnimatedCardItem header style={{backgroundColor: this.getAnimatedColor(), padding: 0, marginBottom: 0}}
                                  button onPress={this.toggleExpand}>
                    <View style={{flex: 1, flexDirection: "column"}}>

                        <View style={{flex: 1, flexDirection: "row"}}>
                            <Left>
                                <Button transparent light onPress={this.toggleExpand}>
                                    <Animated.View style={{...this.getIconRotation()}}>

                                        <Icon name={"md-arrow-dropright"}
                                              style={{
                                                  fontSize: 36,
                                                  padding: 10,
                                                  top: -3,
                                                  right: -3,
                                                  color: 'gray',
                                                  width: "100%",
                                                  height: "100%"
                                              }}/>
                                    </Animated.View>
                                </Button>
                            </Left>
                            <Body style={{
                                width: "100%",
                                flex: 5
                            }}>
                                <Text style={{
                                    width: "100%",
                                    fontWeight: "bold"
                                }}>{achievement.title}</Text>
                            </Body>
                        </View>
                        <View style={{flex: 1, flexDirection: "row"}}>
                            <Left>
                                <Text> {achievement.score} <Score/></Text>
                            </Left>
                            <Right style={{flex: 4, alignItems: "center", justifyContent: "center"}}>
                                {achievementWasCompleted ?
                                    <View style={{width: 40, height: 40, paddingTop: 3}}>
                                        <Svg height="100%" width="100%" viewBox="0 0 100 100">
                                            <Path
                                                d="m 29.410237,56.996918 16.57928,15.8369 c 0,0 29.82778,-28.77264 34.49357,-33.85312 9.42404,-10.26167 7.34158,-23.81988 -7.36094,-30.7410004 -6.42571,-2.79588 -13.8325,-4.12227 -21.15042,-4.12227 -26.17114,0 -47.3870494,21.2159004 -47.3870394,47.3870604 0,26.17112 21.2158994,47.38702 47.3870394,47.38702 26.17113,4e-5 47.38704,-21.2159 47.38704,-47.38702 0,-3.99803 -0.49512,-7.88045 -1.42739,-11.58928"
                                                strokeWidth="10"
                                                stroke={achievementWasCompleted ? 'rgba(108,156,46,0.98)' : '#d5d5d5'}
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeDasharray={[400, 400]}
                                                strokeDashoffset={this.getStrokeOffset()}
                                                scale={0.85}
                                            />
                                        </Svg>
                                    </View>
                                    : achievementWasFailed ? <Text style={{
                                            fontSize: 14,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: material.brandDanger
                                        }}> {L.get('achievement_timed_out')}</Text>
                                        : <Text style={{
                                            fontSize: 14,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}> {timeOutDateString}</Text>
                                }
                            </Right>
                        </View>
                    </View>
                </AnimatedCardItem>

                <Animated.View

                    style={{
                        width: "100%",
                        overflow: "hidden",
                        ...this.getHeight(),
                    }}
                >
                    <View style={{
                        width: "100%", height: "100%"
                    }}>
                        <AnimatedCardItem style={{backgroundColor: this.getAnimatedColor(), width: "100%"}}>

                            <Text onLayout={(e) => this.setExpandedHeight(e)}>
                                {achievement.text}
                            </Text>
                        </AnimatedCardItem>
                        <AnimatedCardItem style={{backgroundColor: this.getAnimatedColor(), width: "100%"}}>
                            <Mutation
                                mutation={COMPLETE_ACHIEVEMENT}
                                refetchQueries={[
                                    {query: CURRENTLY_SELECTED_ACHIEVEMENTS},
                                    {query: GET_SCORE}
                                ]}
                            >
                                {(completeAchievement, {loading, error, refetch}) => (

                                    <Button
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            alignItems: "stretch",
                                            justifyContent: "flex-start"
                                        }}
                                        rounded
                                        block
                                        primary
                                        disabled={!!achievementWasCompleted || !!achievementWasFailed}
                                        onPressIn={(e) => {
                                            this.onPressIn(e, duration, id, achievement, completeAchievement);
                                        }}
                                        onPressOut={(e) => {
                                            this.onPressOut(e, duration);
                                        }}
                                    >

                                        <Text
                                            style={{}}> {achievementWasCompleted ?
                                                L.get("achievement_completed") :
                                                achievementWasFailed ?
                                                    L.get("achievement_timed_out")
                                                    : L.get("achievement_open")}
                                        </Text>
                                        {achievementWasFailed || <View
                                            style={{}}>
                                            <Animated.View style={{width: 40, height: 40, paddingTop: 3}}>
                                                <Svg height="100%" width="100%" viewBox="0 0 100 100">
                                                    <Path
                                                        d="m 29.410237,56.996918 16.57928,15.8369 c 0,0 29.82778,-28.77264 34.49357,-33.85312 9.42404,-10.26167 7.34158,-23.81988 -7.36094,-30.7410004 -6.42571,-2.79588 -13.8325,-4.12227 -21.15042,-4.12227 -26.17114,0 -47.3870494,21.2159004 -47.3870394,47.3870604 0,26.17112 21.2158994,47.38702 47.3870394,47.38702 26.17113,4e-5 47.38704,-21.2159 47.38704,-47.38702 0,-3.99803 -0.49512,-7.88045 -1.42739,-11.58928"
                                                        strokeWidth="10"
                                                        stroke={achievementWasCompleted ? 'rgba(108,156,46,0.98)' : '#d5d5d5'}
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeDasharray={[400, 400]}
                                                        strokeDashoffset={this.getStrokeOffset()}
                                                        scale={0.85}
                                                    />
                                                    <AnimatedPath
                                                        d="m 29.410237,56.996918 16.57928,15.8369 c 0,0 29.82778,-28.77264 34.49357,-33.85312 9.42404,-10.26167 7.34158,-23.81988 -7.36094,-30.7410004 -6.42571,-2.79588 -13.8325,-4.12227 -21.15042,-4.12227 -26.17114,0 -47.3870494,21.2159004 -47.3870394,47.3870604 0,26.17112 21.2158994,47.38702 47.3870394,47.38702 26.17113,4e-5 47.38704,-21.2159 47.38704,-47.38702 0,-3.99803 -0.49512,-7.88045 -1.42739,-11.58928"
                                                        strokeWidth="10"
                                                        stroke='rgba(108,156,46,0.98)'
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeDasharray={[400, 400]}
                                                        strokeDashoffset={this.getStrokeOffset()}
                                                        scale={0.85}
                                                    />
                                                </Svg>
                                            </Animated.View>
                                        </View>}
                                    </Button>
                                )}
                            </Mutation>

                        </AnimatedCardItem>
                        {this.state.showHint && <HoldButtonHint top={this.state.expandedHeight - 110}/>}

                    </View>
                </Animated.View>
            </Animated.View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
    },
    button: {
        padding: 10,
        borderWidth: 3,
        borderColor: '#111'
    },
    text: {
        backgroundColor: 'transparent',
        color: '#111'
    },
    bgFill: {
        position: 'absolute',
        top: 0,
        left: 0
    }
});