import React, {Component, Fragment} from "react";
import {Body, Button, Container, Header, Icon, Left, Right, Spinner, Text, Title} from "native-base";
import material from "../../../native-base-theme/variables/material";
import {Query} from "react-apollo";
import {GET_SCORE, PLAYER_PROGRESS} from "../../network/Badges.gql";
import AnimateNumber from 'react-native-countup';
import RNTooltips from 'react-native-tooltips'
import * as Progress from 'react-native-progress';
import {
    StyleSheet,
    View,
    Animated,
    TouchableOpacity,
    Image,
    StatusBar,
    Platform,
    TouchableWithoutFeedback
} from "react-native";
import {Score} from "./Score";
import {Dimensions} from "react-native";
import {LevelUpTable} from "./levelUpTable"
import {Util} from "../../util";
import {FSModal} from "./FSModal";
import {CollectedBadgeDetails} from "../Badges/BadgeCollection/CollectedBadgeDetails";
import {NextLevelDetails} from "./NextLevelDetails";

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
    state = {
        showHint: false,
        prevLevel: null,
        hasUpdated: true,
        showLevelUpModal: false
    };

    componentDidMount() {
        let {score, levelData} = this.props;
        this.setState({levelData: levelData})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.levelData !== prevProps.levelData) {
            this.setState({levelData: this.props.levelData, hasUpdated: true})
            if(this.props.levelData.index > prevProps.levelData.index)
                this.nextLevelDetails.openModal()

        }
    }


    render() {
        const {score, levelData} = this.props;
        let currentLevel = getCurrentLevel(score);
        let size = 36 * 1.33;
        return (
            <Fragment>
                <FSModal
                    ref={(ref) => this.nextLevelDetails = ref}
                    body={<NextLevelDetails requestModalClose={() => this.nextLevelDetails.closeModal()} score={score} levelData={levelData}/>}
                    darken
                >
                <TouchableWithoutFeedback
                    onPress={() => {
                        console.log("flap");
                        //this.nextLevelDetails.openModal()
                    }}
                >

                    <View style={{
                        backgroundColor: material.levelIconBackground,
                        borderColor: '#000',
                        borderWidth: 3,
                        borderRadius: 5,
                        overflow: "hidden",
                        marginLeft: 5,
                        bottom: 0,
                        flex: 1,
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
                                height: size - 4,
                                width: size - 4,
                                backgroundColor: "transparent",

                            }}
                        />
                    </View>


                </TouchableWithoutFeedback>
                </FSModal>
            </Fragment>
        )
    }
}

class TeamPlaccementContainer extends Component {
    state = {
        showHint: false
    }

    render() {
        const {team} = this.props;

        const {place} = team;

        let borderColor = (function(place) {
            switch (place) {
                case (1):
                    return 'gold';
                case (2):
                    return 'silver';
                case(3):
                    return 'sienna';
                default:
                    return '#aaa'
            }
        })(place);

        let size = 36 * 1.33;
        return (
            <Fragment>
                <TouchableWithoutFeedback
                    onPress={() => {
                        console.log("flap");
                        this.setState({showHint: !this.state.showHint})
                    }}
                >

                    <View style={{
                        backgroundColor: borderColor,
                        borderColor: borderColor,
                        borderWidth: 3,
                        borderRadius: 5,
                        overflow: "hidden",
                        marginLeft: 5,
                        bottom: 0,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        width: size,
                        height: size
                    }}>
                        <Image
                            resizeMode="contain"
                            source={{uri: Util.AvatarToUri(team.avatar)}}
                            fadeDuration={0}
                            style={{
                                height: size - 4,
                                width: size - 4,
                                backgroundColor: "transparent",

                            }}
                        />
                    </View>


                </TouchableWithoutFeedback>

            </Fragment>
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
        lastScore: null,
    };

    render() {
        let {options, navigation} = this.props;
        let topPadding = Platform.OS === 'ios' ? 20 : 5;
        return (
            <Header transparent style={{backgroundColor: material.brandInfo, height: 75 + topPadding}}>

                <Query query={PLAYER_PROGRESS}>
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
                        let {score, currentLevel, levelData, team} = data.playerProgress;
                        console.log({pp: data.playerProgress})
                        let lastLevel = currentLevel > 1 ? LevelUpTable.levels[currentLevel - 1] : null;
                        let lastLevelMaxScore = lastLevel ? lastLevel.maxScore : 0;
                        let nextLevelScore = levelData.maxScore - lastLevelMaxScore;
                        let currentLevelScore = score - lastLevelMaxScore;
                        let currentLevelProgress = `${currentLevelScore}/${nextLevelScore}`;
                        startPolling(100)
                        setTimeout(stopPolling, 400)

                        const hasNotch = Platform.OS === 'android' && StatusBar.currentHeight > 24;

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


                                        <Title style={{top: hasNotch ? 0 : 10}}>
                                            {currentLevelProgress}
                                        </Title>
                                    </View>
                                    <XPBar score={score}/>
                                </View>
                                <View style={{flex: 1, flexDirection: "column"}}>
                                    <CurrentLevelContainer score={score} levelData={levelData}/>
                                </View>
                                <View style={{flex: 1, flexDirection: "column", marginLeft: 5}}>
                                    <TeamPlaccementContainer team={team}/>
                                </View>
                            </View>
                        )
                    }}
                </Query>
            </Header>
        )
    }
}