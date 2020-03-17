import React, {Component, Fragment} from "react";
import {Body, Button, Container, Header, Icon, Left, Right, Spinner, Text, Title} from "native-base";
import material from "../../../native-base-theme/variables/material";
import {Query} from "react-apollo";
import {GET_SCORE} from "../../network/Badges.gql";
import AnimateNumber from 'react-native-countup';
import RNTooltips from 'react-native-tooltips'
import * as Progress from 'react-native-progress';
import {StyleSheet, View, Animated, TouchableOpacity, Image, StatusBar, Platform} from "react-native";
import {Score} from "./Score";
import {Dimensions} from "react-native";
import {LevelUpTable} from "./levelUpTable"

class ScoreContainer extends Component {

    state = {
        prevScore: null,
        hasUpdated: false
    };

    componentDidMount() {
        let {score} = this.props;
        this.setState({intialScore: score})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.score !== prevProps.score)
            this.setState({prevScore: prevProps.score, hasUpdated: true})
    }


    render() {
        let {score} = this.props;
        let {prevScore} = this.state;
        if (prevScore === null) {
            prevScore = score;
        }
        return (
            <View style={{flex: 1, flexDirection: "row"}}>

                <Title>
                    <AnimateNumber
                        value={score}
                        initial={prevScore}
                        formatter={(val) => {
                            return parseFloat(val).toFixed(0)
                        }}
                    />
                    <Text> </Text>

                    <Score pt={20}/>

                </Title>

            </View>
        )
    }
}

class CurrentLevelContainer extends Component {
    render() {
        const {score} = this.props;
        let currentLevel = getCurrentLevel(score);
        let size = 36 * 1.33;
        return (

            <View style={{
                backgroundColor: material.levelIconBackground,
                borderColor: '#000',
                borderWidth: 3,
                borderRadius: 5,
                overflow: "hidden",
                marginLeft: 5,
                bottom: 0,
                flex:1,
                justifyContent: "center",
                alignItems: "center",
                width: size,
                height: size
            }}>
                <Image
                    resizeMode="contain"
                    source={currentLevel.icon.path}
                    fadeDuration={0}
                    style={{
                        height: size-4,
                        width: size-4,
                        backgroundColor: "transparent",

                    }}

                />
            </View>
        )
    }
}

const mapToRange = (a, b, t) => {
    return (t - a) / (b - a)
};

const getCurrentLevel = (score) => {
    for (let l of LevelUpTable.levels) {
        if (score < l.maxScore) {
            return l;
        }
    }
    return LevelUpTable.levels[LevelUpTable.levels.length - 1]
};



const getProgressInLevel = (score, level) => {
    let lowerBound = 0;
    if (level.index > 0) {
        lowerBound = LevelUpTable.levels[level.index - 1].maxScore;
    }
    let upperBound = level.maxScore;

    return mapToRange(lowerBound, upperBound, score)
};

class XPBar extends Component {


    state = {
        prevScore: null,
        hasUpdated: false
    };

    componentDidMount() {
        let {score} = this.props;
        this.setState({intialScore: score})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.score !== prevProps.score)
            this.setState({prevScore: prevProps.score, hasUpdated: true})
    }


    render() {
        const screenWidth = Math.round(Dimensions.get('window').width);
        const {score} = this.props;
        let currentLevel = getCurrentLevel(score);
        let progress = getProgressInLevel(score, currentLevel);
        return (
            <Progress.Bar
                progress={progress}
                width={null}
                borderRadius={0}
                color={material.brandSuccess}
                unfilledColor={material.brandLight}

            />
        )
    }
}

export class PersistentScoreHeader extends Component {

    state = {
        scoreToolTipVisible: false,
        lastScore: null
    };

    render() {
        let {options, navigation} = this.props;
        let topPadding = Platform.OS === 'ios' ? 20 : 5;
        return (
            <Header transparent style={{backgroundColor: material.brandInfo, height: 75+topPadding}}>

                <Query query={GET_SCORE}>
                    {({loading, error, data, startPolling, stopPolling}) => {
                        if (loading) return (
                            <Fragment>
                                <Left/>
                                <Body>
                                    <Spinner/>
                                </Body>
                                <Left/>
                            </Fragment>
                        );
                        if (error) return <Text>Error {error.message}</Text>;
                        let {score} = data;
                        let currentLevel = getCurrentLevel(score);
                        let lastLevel = currentLevel.index > 1 ? LevelUpTable.levels[currentLevel.index -1] : null;
                        let lastLevelMaxScore = lastLevel ? lastLevel.maxScore : 0;
                        let nextLevelScore = currentLevel.maxScore - lastLevelMaxScore;
                        let currentLevelScore = score - lastLevelMaxScore;
                        let currentLevelProgress = `${currentLevelScore}/${nextLevelScore}`;

                            const hasNotch = Platform.OS === 'android' &&  StatusBar.currentHeight > 24;

                        return (
                            <View style={{paddingTop: topPadding, flex: 1, flexDirection: "row"}}>
                                <View style={{flex: 6, paddingBottom: 2, flexDirection: "column"}}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        alignItems: "baseline",
                                        paddingLeft: 10,
                                        paddingRight: 10
                                    }}>
                                        <ScoreContainer score={score}/>


                                        <Title style={{top: hasNotch?0:10}}>
                                            {currentLevelProgress}
                                        </Title>
                                    </View>
                                    <XPBar score={score}/>
                                </View>
                                <View style={{flex: 1, flexDirection: "column"}}>
                                    <CurrentLevelContainer score={score}/>
                                </View>
                            </View>
                        )
                    }}
                </Query>
            </Header>
        )
    }
}