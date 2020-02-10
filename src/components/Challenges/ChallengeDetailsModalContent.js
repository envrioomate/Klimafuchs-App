import React, {Fragment} from 'react';
import {ImageBackground, StyleSheet, Switch, TouchableOpacity, View} from 'react-native'
import {Button, Card, CardItem, Container, Content, H3, Icon, Left, Right, Text} from "native-base";
import material from "../../../native-base-theme/variables/material";
import {Mutation} from "react-apollo";
import PropTypes from 'prop-types';
import {
    COMPLETE_CHALLENGE,
    CURRENT_CHALLENGES,
    REJECT_CHALLENGE,
    UNCOMPLETE_CHALLENGE
} from "../../network/Challenges.gql";
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";
import {FSModalContentBase} from "../Common/FSModal";
import {MaterialDialog} from "react-native-material-dialog";

export class ChallengeDetailsModalContent extends FSModalContentBase {
    state = {
        loading: false,
        optimisticResult: false,
        showRejectDialog: false,
        showHint: false,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        let {userChallenge} = nextProps;
        let {loading} = prevState;
        if (loading) return null;
        const challengeCompletion = userChallenge.challengeCompletion;
        return {optimisticResult: !!challengeCompletion};
    }

    getCompletionActionButton = (challengeGoals, challengeCompletion, targetId, refetch, modalNotify) => {
        console.log("ChallengeCompletion:", challengeGoals)
        if (challengeCompletion) {
            return (
                <Mutation mutation={UNCOMPLETE_CHALLENGE}>
                    {(uncompleteChallenge, {loading, error}) => (

                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text>{challengeCompletion.challengeGoalCompletionLevel}</Text>
                            <Switch
                                value={this.state.optimisticResult}
                                disabled={loading}
                                onValueChange={async () => {
                                    console.log("!")
                                    this.setState({loading: true, optimisticResult: false})
                                    await uncompleteChallenge({
                                        variables: {
                                            challengeCompletionId: challengeCompletion.id
                                        },
                                    });
                                    modalNotify(false);
                                    refetch()
                                }}/>
                            <View>
                                <TouchableOpacity style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
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
                                        title={L.get('hint_challengecomplete_title')}
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
                                            {L.get("hint_challengecomplete")}
                                        </Text>
                                    </MaterialDialog>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Mutation>
            )
        } else {
            return (
                <Mutation mutation={COMPLETE_CHALLENGE}>
                    {(completeChallenge, {loading, error}) => (
                        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}}>
                            <CardItem style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <Right style={{flex: 1}}>
                                    <Switch
                                        value={this.state.optimisticResult}
                                        disabled={loading}
                                        onValueChange={async () => {
                                            this.setState({loading: true, optimisticResult: true});
                                            await completeChallenge({
                                                variables: {
                                                    challengeId: targetId,
                                                    challengeGoalCompletionLevel: 0,
                                                    challengeCompletionQuantity: 0.0
                                                },
                                            });
                                            refetch()
                                        }}/>
                                </Right>
                                <Left style={{flex: 3}}>
                                    <Text>{challengeGoals.minCompletion || "Challenge.MinCompletion missing!"}</Text>
                                </Left>
                            </CardItem>

                            <CardItem style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <Right style={{flex: 1}}>
                                    <Switch
                                        value={this.state.optimisticResult}
                                        disabled={loading}
                                        onValueChange={async () => {
                                            this.setState({loading: true, optimisticResult: true});
                                            await completeChallenge({
                                                variables: {
                                                    challengeId: targetId,
                                                    challengeGoalCompletionLevel: 1,
                                                    challengeCompletionQuantity: 0.0
                                                },
                                            });
                                            refetch()
                                        }}/>
                                </Right>
                                <Left style={{flex: 3}}>
                                    <Text>{challengeGoals.medCompletion || "Challenge.medCompletion missing!"}</Text>
                                </Left>
                            </CardItem>

                            <CardItem style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <Right style={{flex: 1}}>
                                    <Switch
                                        value={this.state.optimisticResult}
                                        disabled={loading}
                                        onValueChange={async () => {
                                            this.setState({loading: true, optimisticResult: true});
                                            await completeChallenge({
                                                variables: {
                                                    challengeId: targetId,
                                                    challengeGoalCompletionLevel: 2,
                                                    challengeCompletionQuantity: 0.0
                                                },
                                            });
                                            refetch()
                                        }}/>
                                </Right>
                                <Left style={{flex: 3}}>
                                    <Text>{challengeGoals.goodCompletion || "Challenge.goodCompletion missing!"}</Text>
                                </Left>
                            </CardItem>

                            <CardItem style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <Right style={{flex: 1}}>
                                    <Switch
                                        value={this.state.optimisticResult}
                                        disabled={loading}
                                        onValueChange={async () => {
                                            this.setState({loading: true, optimisticResult: true});
                                            await completeChallenge({
                                                variables: {
                                                    challengeId: targetId,
                                                    challengeGoalCompletionLevel: 3,
                                                    challengeCompletionQuantity: 0.0
                                                },
                                            });
                                            refetch()
                                        }}/>
                                </Right>
                                <Left style={{flex: 3}}>
                                    <Text>{challengeGoals.maxCompletion || "Challenge.maxCompletion missing!"}</Text>
                                </Left>
                            </CardItem>


                            <View>
                                <TouchableOpacity style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
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
                                        title={L.get('hint_challengecomplete_title')}
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
                                            {L.get("hint_challengecomplete")}
                                        </Text>
                                    </MaterialDialog>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Mutation>
            )
        }
    };

    render() {
        let {userChallenge, refetch, requestModalClose, modalNotify, jokerCount} = this.props;
        const targetId = userChallenge.id;
        const challengeCompletion = userChallenge.challengeCompletion;
        let challenge = userChallenge.challenge;
        console.log(userChallenge);
        return (
            <Card style={{
                margin: '10%',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'stretch'
            }}>
                <View header style={{backgroundColor: material.brandInfo, flex: 2}}>
                    <ImageBackground
                        source={challenge.headerImage ? {uri: challenge.headerImage.url} : require('../../../assets/image_select.png')}
                        style={{width: '100%', height: '100%', backgroundColor: "#ff0"}}>
                        <View>
                            <Button transparent info onPress={() => {
                                requestModalClose();
                            }}>
                                <Icon style={{fontSize: 30, color: material.textLight}} name="md-close"/>
                            </Button>
                        </View>
                    </ImageBackground>
                </View>
                <CardItem style={{flex: 3, flexDirection: 'column', alignItems: 'stretch'}}>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
                        {this.getCompletionActionButton(userChallenge.challenge.challengeGoals, challengeCompletion, targetId, refetch, modalNotify)}
                    </View>

                </CardItem>
                <CardItem style={{flex: 3, flexDirection: 'column', alignItems: 'stretch'}}>
                    <H3 style={{flex: 2}}>
                        {challenge.title}
                    </H3>
                    <Container style={{flex: 6}}>
                        <Content>
                            <Text style={{color: material.textLight}}>
                                {challenge.content}
                            </Text>
                        </Content>
                    </Container>
                </CardItem>

                <CardItem footer>
                    <Right style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Button transparent disabled={!userChallenge.replaceable} onPress={() => {
                            this.setState({showRejectDialog: true});
                        }}>
                            <Mutation mutation={REJECT_CHALLENGE} refetchQueries={[CURRENT_CHALLENGES]}>
                                {(rejectChallenge, {loading, error}) => {
                                    return (
                                        <Fragment>
                                            <Text style={{color: material.textLight}}>{L.get('reject_challenge')}</Text>
                                            <MaterialDialog
                                                title={L.get('hint_seasonplan_challenge_reject_title')}
                                                visible={this.state.showRejectDialog}
                                                cancelLabel={L.get('no')}
                                                onCancel={() => {
                                                    this.setState({showRejectDialog: false})
                                                }}
                                                okLabel={L.get('yes')}
                                                onOk={async () => {
                                                    this.setState({showRejectDialog: false});
                                                    console.log("!!");
                                                    this.setState({loading: true, optimisticResult: true});

                                                    await rejectChallenge({
                                                        variables: {
                                                            challengeId: targetId
                                                        },
                                                    });
                                                    refetch()

                                                }}
                                                colorAccent={material.textLight}
                                            >

                                                <Text style={{color: material.textLight}}>
                                                    {L.get("hint_seasonplan_challenge_reject", {jokerCount: jokerCount})}
                                                </Text>
                                            </MaterialDialog>
                                        </Fragment>
                                    )
                                }}
                            </Mutation>

                        </Button>
                    </Right>

                    <Left style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Button transparent onPress={() => {
                            requestModalClose();
                        }}>
                            <Text style={{color: material.textLight}}>{L.get('okay')}</Text>
                        </Button>
                    </Left>
                </CardItem>
            </Card>
        )
    }
}

ChallengeDetailsModalContent.propTypes = {
    userChallenge: PropTypes.any,
    challengeCompletion: PropTypes.any,
    targetId: PropTypes.any,
    refetch: PropTypes.any,
    closeModal: PropTypes.any
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#ff0000',
        margin: '5%',
    },
});
