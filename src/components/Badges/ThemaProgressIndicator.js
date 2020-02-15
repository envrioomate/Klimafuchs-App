import React, {Component, Fragment} from 'react';
import {
    Body,
    Button,
    Container,
    Content,
    H3,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Title,
    Card,
    CardItem,
    Spinner
} from 'native-base';
import {Animated, Easing, TouchableOpacity, FlatList, Image, RefreshControl, StyleSheet, View} from 'react-native'
import material from "../../../native-base-theme/variables/material";
import * as PropTypes from "prop-types";
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";
import {MaterialDialog} from "react-native-material-dialog";


export default class ThemaProgressIndicator extends Component {
    state = {
        oldBadges: null,
        shouldUpdate: true
    };


    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.oldBadges)
            return {oldBadges: nextProps.badges, shouldUpdate: nextProps.shouldUpdate};
        else if(nextProps.shouldUpdate){
            return {oldBadges: nextProps.badges, shouldUpdate: nextProps.shouldUpdate};
        } else {
            return {shouldUpdate: nextProps.shouldUpdate};
        }
    }


    render() {
        //TODO replace with something actually good and move to parent component for better layout options,
        // also steal overlaying layout code from FAB

        const {badges, shouldUpdate} = this.props;
        const badgeCompletions = shouldUpdate ? badges.map(badge => badge.badgeCompletion).filter(Boolean) : this.state.oldBadges.map(badge => badge.badgeCompletion).filter(Boolean);
        return (
            <View style={{
                height: 48,
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
            }}>
                <BadgeProgressBar progress={badgeCompletions.length}/>
            </View>
        )
    }
}

class RenderProgressDot extends Component {

    state = {
        fadeAnim: new Animated.Value(0),
        showImg: 0,
    };

    componentDidMount() {
        this.setState({showImg: (this.props.progress >= this.props.min ? 1 : 0)});

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let showImg = (nextProps.progress >= nextProps.min ? 1 : 0);
        Animated.timing(prevState.fadeAnim, {
            toValue: showImg,
            duration: 300,
            delay: (nextProps.min - 1) * 1000
        }).start();
        return {showImg};

    }

    render() {
        let {assetUri} = this.props;
        let {fadeAnim} = this.state;

        let imgOpacityStyle = {
            opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
            })
        };

        let dotOpacityStyle = {
            opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
            })
        };

        return (
            <Animated.View style={{flex: 1}}>
                <Animated.View
                    style={[{
                        width: 32,
                        height: 32,
                        borderRadius: 32 / 2,
                        margin: 5,
                        backgroundColor: '#cfcfcf'
                    }, dotOpacityStyle]}
                />
                <Animated.Image
                    style={[{
                        flex: 1,
                        width: 32,
                        height: 32,
                        margin: 5,
                        position: 'absolute',
                    }, imgOpacityStyle]}
                    resizeMode="contain"
                    source={assetUri()}
                />
            </Animated.View>
        )
    }
}

RenderProgressDot.propTypes = {
    progress: PropTypes.number,
    min: PropTypes.number,
    assetUri: PropTypes.func
}

class BadgeProgressBar extends Component {


    state = {
        fillAnim: new Animated.Value(0),
        showHint: false
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        let progressSteps = (nextProps.progress - 1);
        let progressFill = Math.max(0, ((nextProps.progress - 1) / 3));

        Animated.timing(prevState.fillAnim, {
            toValue: progressFill,
            duration: progressSteps * 1000,

        }).start();
        return null;
    }


    makeProgressImages = (progress) => {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'space-between',
                width: '100%',
            }}>
                <RenderProgressDot progress={progress} min={1} assetUri={() => {
                    return require("../../../assets/leaf_brown.png")
                }}/>
                <RenderProgressDot progress={progress} min={2} assetUri={() => {
                    return require("../../../assets/leaf_yellow.png")
                }}/>
                <RenderProgressDot progress={progress} min={3} assetUri={() => {
                    return require("../../../assets/leaf_green.png")
                }}/>
                <RenderProgressDot progress={progress} min={4} assetUri={() => {
                    return require("../../../assets/leaf_dark_green.png")
                }}/>
            </View>
        )
    };

    render() {
        let {progress} = this.props;
        let {fillAnim} = this.state;
        // progress = 2;
        let progressFill = Math.max(0, ((progress - 1) / 3) * 100);

        let animatedStyle = {
            width: fillAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
            })
        };
        let progressImages = this.makeProgressImages(progress);
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '10%',
                marginRight: '10%',
            }}>
                <View style={{
                    height: 32,
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '30%'
                }}>
                    <View style={{
                        height: 3,

                        marginLeft: '10%',
                        marginRight: '15%'
                    }}>
                        <View style={{
                            backgroundColor: 'gray',
                            position: 'absolute',
                            width: '100%',
                            height: '100%'
                        }}/>
                        <Animated.View style={[{
                            backgroundColor: material.brandInfo,
                            position: 'absolute',

                            height: '100%'
                        }, animatedStyle]}/>
                    </View>
                    <View style={{
                        position: 'absolute',
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'space-between',
                    }}>
                        {progressImages}
                    </View>
                </View>
                <View style={{
                    marginLeft: '5%',
                }}>


                    <TouchableOpacity style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'darkgray',
                        height: 24,
                        width: 24,
                        borderRadius: 24 / 2,
                        marginTop: 2,
                        marginBottom: 2,

                    }} onPress={() => {
                        this.setState({showHint: true})
                    }}
                    >
                        <Icon style={{color: '#404040'}} name='md-information-circle'/>
                        <MaterialDialog
                            title={L.get('hint_seasonplan_progress_title')}
                            visible={this.state.showHint}
                            cancelLabel=''
                            onCancel={() => {
                                this.setState({showHint: false})
                            }}
                            okLabel={L.get('okay')}
                            onOk={() => {
                                this.setState({showHint: false})
                            }}
                            colorAccent={material.textLight}
                        >

                            <Text>
                                {L.get("hint_seasonplan_progress")}
                            </Text>
                        </MaterialDialog>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}