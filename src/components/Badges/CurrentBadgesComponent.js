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
import material from "../../../native-base-theme/variables/material";
import {Animated, Easing, TouchableOpacity, FlatList, Image, RefreshControl, StyleSheet, View} from 'react-native'
import {CURRENT_BADGES, CURRENT_SEASONPLAN} from "../../network/Badges.gql";
import {Query} from "react-apollo";
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";
import ThemaProgressIndicator from "./ThemaProgressIndicator";
import {ThemaComponent} from "./ThemaComponent";
import BadgePreviewListComponent from "./BadgePreviewListComponent";


export default class CurrentBadgesComponent extends Component {

    state = {
        refreshing: false,
        modalOpen: false,
        refetchers: []
    };


    reload = () => {
        this.setState({refreshing: true});
        this.state.refetchers.map(refetch => {
            refetch()
        });
        this.setState({refreshing: false});

    };

    renderCurrentTopic = () => {
        return (
            <Query query={CURRENT_SEASONPLAN}>
                {({loading, error, data, refetch}) => {
                    this.state.refetchers.push(refetch);
                    if (loading) return (
                        <Container>
                            <Spinner/>
                        </Container>
                    );
                    if (error) return <Text>Error {error.message}</Text>;
                    if (data.globalCurrentChallenges) {
                        const thema = data.globalCurrentChallenges.thema;
                        return (
                            <Content
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing || loading}
                                        onRefresh={() => this.reload()}
                                    />
                                }
                            >
                                <ThemaComponent thema={thema}/>
                            </Content>
                        )
                    }
                    return (
                        <Text>no current challenges!</Text>
                    )
                }}
            </Query>
        )
    };


    render() {
        return (
            <Container>
                <Content refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.reload()}
                />}
                >

                    <Query query={CURRENT_BADGES}>
                        {({loading, error, data, refetch}) => {
                            this.state.refetchers.push(refetch);

                            if (loading) return (
                                <Container>
                                    <Spinner/>
                                </Container>
                            );
                            if (error) return <Text>Error {error.message}</Text>;
                            if (data.currentChallenges) {
                                const challenges = data.currentChallenges;
                                console.log(challenges.map(c => {return c.replaceable}));
                                return (
                                    <Fragment>
                                        <ThemaProgressIndicator badges={challenges} shouldUpdate={!this.state.modalOpen}/>
                                        <View style={{
                                            flex: 1,
                                            margin: 10,
                                        }}>
                                            {this.renderCurrentTopic()}
                                        </View>
                                        <View style={{
                                            flex: 3,
                                            margin: 10,
                                        }}>
                                            <BadgePreviewListComponent badges={challenges} refetch={refetch}/>
                                        </View>
                                    </Fragment>
                                )
                            } else {
                                return (<Text>ERR</Text>)
                            }
                        }}
                    </Query>

                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    ChallengesComponent: {
        flex: 3,
        margin: 10,
    },
    RenderThemenwocheComponent: {
        flex: 1,
        margin: 10,
    },
    Challenge: {
        margin: 10
    },
    ChallengeProgressIndicatorSegment: {
        margin: 2,
    },
    ChallengeProgressBarBar: {}
});