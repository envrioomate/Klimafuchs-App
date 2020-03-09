import React, {Component, Fragment} from "react";
import {Body, Button, Container, Header, Icon, Left, Right, Spinner, Text, Title} from "native-base";
import material from "../../../native-base-theme/variables/material";
import {Query} from "react-apollo";
import {GET_SCORE} from "../../network/Badges.gql";
import AnimateNumber from 'react-native-countup';
import RNTooltips from 'react-native-tooltips'
import * as Progress from 'react-native-progress';
import {StyleSheet, View, Animated, TouchableOpacity, Image} from "react-native";
import {Score} from "../Common/Score";
import {Dimensions} from "react-native";
import {LevelUpTable} from "../Common/levelUpTable"

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
                    <Score pt={20}/>
                    <Text> </Text>
                    <AnimateNumber
                        value={score}
                        initial={prevScore}
                        formatter={(val) => {
                            return parseFloat(val).toFixed(0)
                        }}
                    />
                </Title>

            </View>
        )
    }
}

class CurrentLevelContainer extends Component {
    render() {
        const {score} = this.props;
        let currentLevel = getCurrentLevel(score);
        let size = 20 * 1.33;
        return (

            <View style={{
                backgroundColor: material.brandLight,
                borderRadius: 5,
                overflow: "hidden"
            }}>
                <Image
                    resizeMode="contain"
                    source={currentLevel.icon.path}
                    fadeDuration={0}
                    style={{
                        height: size,
                        width: size
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
    return levelUpTable.levels[levelUpTable.levels.length - 1]
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
        console.log({currentLevel, score, progress});
        return (
            <Progress.Bar
                progress={progress}
                width={screenWidth + 2}
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
        return (
            <Header transparent style={{backgroundColor: material.brandInfo}}>

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
                        console.log(data.score);
                        return (
                            <View style={{paddingTop: 5}}>

                                <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "baseline", paddingLeft: 10, paddingRight: 10}}>
                                    <Left/>

                                    <ScoreContainer score={data.score}/>
                                    <CurrentLevelContainer score={data.score}/>
                                    <Left/>

                                </View>
                                <XPBar score={data.score}/>
                            </View>
                        )
                    }}
                </Query>
            </Header>
        )
    }
}