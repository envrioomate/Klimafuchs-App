import React, {Component} from "react";
import {Mutation} from "react-apollo";
import {COMPLETE_ACHIEVEMENT, CURRENTLY_SELECTED_ACHIEVEMENTS, GET_SCORE} from "../../../network/Badges.gql";
import {Button, Text} from "native-base";
import {Animated, View} from "react-native";
import Svg, {Path} from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export class CompleteAchievementButton extends Component {

    state = {
        loading: false,
        hasCompleted: false,

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

    render() {

        let {id, achievementWasCompleted, achievement, duration} = this.props;

        return (
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
        )
    }

}