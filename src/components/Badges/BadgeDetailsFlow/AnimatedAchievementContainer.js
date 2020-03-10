import React, {Component} from "react";
import {Animated, StyleSheet, View} from "react-native";
import {Body, Button, Card, CardItem, H1, Text, Right} from "native-base";
import Svg, {Path} from 'react-native-svg';
import {COMPLETE_ACHIEVEMENT, CURRENTLY_SELECTED_ACHIEVEMENTS, GET_SCORE} from "../../../network/Badges.gql";
import {Mutation} from "react-apollo";
import {ExternalLinkButton} from "../ExternalLinkButton";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedCard = Animated.createAnimatedComponent(Card)
const AnimatedCardItem = Animated.createAnimatedComponent(CardItem)

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
        collapsed: true
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
            expandedHeight: e.nativeEvent.layout.height
        });
    }


    toggleExpand = () => {
        let initialHeight = this.state.collapsed ? this.state.collapsedHeight : this.state.expandedHeight;
        let finalHeight = this.state.collapsed ? this.state.expandedHeight : this.state.collapsedHeight;

        this.state.currentHeight.setValue(initialHeight);
        Animated.spring(this.state.currentHeight, {
            to: finalHeight,
            duration: 1000,

        }).start();

    }


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

        let {id, achievement, achievementCompletions} = achievementSelection;
        let achievementWasCompleted = achievementCompletions.length > 0;

        const {hasCompleted, hasCompletedText, duration} = this.state;

        return (
            <Animated.View style={achievementWasCompleted ? {
                width: "95%", borderRadius: 10, borderWidth: 1, borderColor:'#6C9C2E',
                margin: 10, backgroundColor: 'rgba(108,156,46,0.12)'
            } : {
                backgroundColor: this.getAnimatedColor(), width: "95%", borderRadius: 10, borderWidth: 1,
                margin: 10, ...this.getCardBorderStyle(),
            }}>

                <AnimatedCardItem style={{backgroundColor: this.getAnimatedColor(),}}>
                    <Body style={{
                        width: "100%",
                    }}>
                        <Text style={{
                            width: "100%",
                        }}>{achievement.title}</Text>
                    </Body>

                </AnimatedCardItem>

                <Animated.View

                    style={{
                        width: "100%",
                        overflow: "hidden",
                        height: this.currentHeightValue
                    }}
                >
                    <View onLayout={(e) => this.setExpandedHeight(e)} style={{
                        width: "100%",
                        overflow: "hidden"
                    }}>



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
                                        disabled={achievementWasCompleted}
                                        onPressIn={(e) => {
                                            this.onPressIn(e, duration, id, achievement, completeAchievement);
                                        }}
                                        onPressOut={(e) => {
                                            this.onPressOut(e, duration);
                                        }}
                                    >

                                        <Text
                                            style={{}}> {achievementWasCompleted ? "Schon erledigt" : "Geschafft?"}</Text>
                                        <View
                                            style={{}}>
                                            <Animated.View style={{width: 40, height: 40, paddingTop: 3}}>
                                                <Svg height="100%" width="100%" viewBox="0 0 100 100">
                                                    <Path
                                                        d="m 29.410237,56.996918 16.57928,15.8369 c 0,0 29.82778,-28.77264 34.49357,-33.85312 9.42404,-10.26167 7.34158,-23.81988 -7.36094,-30.7410004 -6.42571,-2.79588 -13.8325,-4.12227 -21.15042,-4.12227 -26.17114,0 -47.3870494,21.2159004 -47.3870394,47.3870604 0,26.17112 21.2158994,47.38702 47.3870394,47.38702 26.17113,4e-5 47.38704,-21.2159 47.38704,-47.38702 0,-3.99803 -0.49512,-7.88045 -1.42739,-11.58928"
                                                        strokeWidth="10"
                                                        stroke= {achievementWasCompleted ? 'rgba(108,156,46,0.98)' : '#d5d5d5' }
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
                                        </View>
                                    </Button>
                                )}
                            </Mutation>

                        </AnimatedCardItem>
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