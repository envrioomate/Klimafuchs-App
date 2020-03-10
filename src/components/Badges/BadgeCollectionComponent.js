import React, {Component, Fragment} from 'react';
import {FlatList, Image, StyleSheet, View, Dimensions, TouchableOpacity} from "react-native";
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
import {Query} from "react-apollo";
import {COMPLETED_BADGES} from "../../network/Badges.gql";
import {badgeScreenStyles, completionLevelToColor} from "./BadgeUtils";
import * as PropTypes from "prop-types";
import Modal from "react-native-modal";
import {MaterialDialog} from "react-native-material-dialog";

class CollectedBadge extends Component {
    state = {
        modalVisible: false
    };

    render() {
        let {completion} = this.props;
        const badge = completion.seasonPlanChallenge.challenge;
        const icon = badge.icon;
        const iconTint = completionLevelToColor(completion);
        //TODO Badge Border und text beschreibung +  completion text + externalLink
        return (
            <Fragment>
                <TouchableOpacity
                    style={{
                        margin: 2,
                        elevation: 5,
                    }}
                    onPress={() => {
                        this.setState({modalVisible: false})
                    }}
                >
                    <View style={{
                        backgroundColor: iconTint,
                        borderRadius: 5,
                        overflow: "hidden",
                        flex: 1
                    }}>
                        <Image style={{backgroundColor: iconTint, ...styles.collected}}
                               source={icon ? {uri: icon.url + '?date=' + (new Date()).getHours()} : require('../../../assets/image_select.png')}
                               resizeMode="contain"
                        />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{flex: 1, flexWrap: "wrap"}}>
                            {badge.title || badge.name}
                        </Text>
                    </View>
                </TouchableOpacity>

                <Modal
                    visible={this.state.modalVisible}
                    backdropColor="#B4B3DB"
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                    onRequestClose={() => {
                        this.setState({modalVisible: false})
                    }}>
                    <View style={{ width: "90%", height:"40%"}}>
                        <View style={{
                            backgroundColor: iconTint,
                            borderRadius: 5,
                            overflow: "hidden",
                            flex: 1,
                            ...styles.collected
                        }}>
                            <Image style={{backgroundColor: iconTint, ...styles.collected}}
                                   source={icon ? {uri: icon.url + '?date=' + (new Date()).getHours()} : require('../../../assets/image_select.png')}
                                   resizeMode="contain"
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 1, flexWrap: "wrap"}}>
                                {badge.title || badge.name}
                            </Text>
                        </View>
                    </View>
                </Modal>
            </Fragment>
        )
    }
}

CollectedBadge.propTypes = {completion: PropTypes.any}

export default class BadgeCollectionComponent extends Component {
    static navigationOptions = {
        title: 'Abzeichen',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
        ),
    };


    render() {
        return (
            <Body style={{backgroundColor: '#fff', width: "100%"}}>
                <Query query={COMPLETED_BADGES}>
                    {({loading, error, data, refetch}) => {
                        if (loading) return (
                            <Container>
                                <Spinner/>
                            </Container>
                        );
                        if (error) return <Text>Error {error.message}</Text>;
                        const completions = data.getCompletedChallenges;
                        let shownCompletions = completions.filter(c => c.challengeGoalCompletionLevel !== "MIN");
                        console.log(shownCompletions);

                        return (
                            <View style={{margin: 10}}>
                                <FlatList
                                    style={{flex: 1}}
                                    data={shownCompletions}
                                    keyExtractor={(item, index) => item.id.toString()}
                                    renderItem={({item}) => {
                                        return <CollectedBadge completion={item}/>
                                    }}
                                    numColumns={3}
                                >
                                </FlatList>
                            </View>
                        )
                    }}
                </Query>
            </Body>
        )
    }
}

const styles = StyleSheet.create({
    collected: {
        width: (Dimensions.get('window').width / 3) - 10,
        height: (Dimensions.get('window').width / 3) - 10,
        borderRadius: 5,
        padding: 20,
    },
    modal: {
        backgroundColor: 'rgba(0,0,0,0)',
        margin: '5%',
    },
});