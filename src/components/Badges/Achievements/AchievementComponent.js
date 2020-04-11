import React, {Component} from 'react';
import {Body, Button, Card, Content, CardItem, Container, Icon, Left, Right, Spinner, Text} from 'native-base';
import {Mutation, Query} from "react-apollo";
import {
    COMPLETE_ACHIEVEMENT,
    CURRENTLY_SELECTED_ACHIEVEMENTS,
    GET_SCORE,
    PAST_SELECTED_ACHIEVEMENTS
} from "../../../network/Badges.gql";
import {FlatList, StyleSheet, RefreshControl} from "react-native";
import material from "../../../../native-base-theme/variables/material";
import {AnimatedAchievementContainer} from "./AnimatedAchievementContainer";
import {HintPopUp} from "../../Common/HintPopUp";
import {LocalizationProvider as L} from "../../../localization/LocalizationProvider";


export default class AchievementComponent extends Component {

    static navigationOptions = {
        title: 'Achievments',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
        ),
    };

    styles = {
        completed: StyleSheet.create({
            achievementCardItem: {
                backgroundColor: material.brandSuccess
            },
            achievementCard: {
                backgroundColor: material.brandSuccess

            }

        }),

        default: StyleSheet.create({
            achievementCardItem: {},
            achievementCard: {}
        })
    };


    state = {
        selectedAchievements: new Set(),
        showArchive: false
    };

    AchievementPreview = ({achievementSelection}) => {
        let {id, achievement, achievementCompletions} = achievementSelection;
        console.log({id, achievement, achievementCompletions});
        let achievementWasCompleted = achievementCompletions.length > 0;

        let cardStyle = achievementWasCompleted ?
            this.styles.completed
            : this.styles.default;
        return (
            <AnimatedAchievementContainer achievementSelection={achievementSelection}/>
        )
    }

    sortCompletedness = (a, b) => {
        return a.achievementCompletions.length - b.achievementCompletions.length
    };

    sortSelectedAt = (a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
    };

    render() {
        return (
            <Container transparent>
                {!this.state.showArchive ?
                    <Query query={CURRENTLY_SELECTED_ACHIEVEMENTS}>
                        {({loading, error, data, refetch}) => {
                            if (loading) return (
                                <Container>
                                    <Spinner/>
                                </Container>
                            );
                            if (error) return <Text>Error {error.message}</Text>;

                            let currentAchievements = data.currentlySelectedAchievements;

                            console.log(currentAchievements)
                            currentAchievements.sort(this.sortSelectedAt);
                            currentAchievements.sort(this.sortCompletedness);

                            return (
                                <Content refreshControl={<RefreshControl
                                    refreshing={loading}
                                    onRefresh={() => refetch()}
                                />}>
                                    <FlatList style={{flex: 1}}
                                              data={data.currentlySelectedAchievements}
                                              keyExtractor={(item, index) => item.achievement.name.toString()}
                                              renderItem={({item}) => {
                                                  return <this.AchievementPreview key={item.name}
                                                                                  achievementSelection={item}/>
                                              }
                                              }
                                    />
                                </Content>
                            )
                        }}
                    </Query>
                    :

                    <Query query={PAST_SELECTED_ACHIEVEMENTS}>
                        {({loading, error, data, refetch}) => {
                            if (loading) return (
                                <Container>
                                    <Spinner/>
                                </Container>
                            );
                            if (error) return <Text>Error {error.message}</Text>;

                            let pastSelectedAchievements = data.pastSelectedAchievements;

                            console.log(pastSelectedAchievements)
                            pastSelectedAchievements.sort(this.sortSelectedAt);
                            pastSelectedAchievements.sort(this.sortCompletedness);

                            return (
                                <Content refreshControl={<RefreshControl
                                    refreshing={loading}
                                    onRefresh={() => refetch()}
                                />}>
                                    <FlatList style={{flex: 1}}
                                              data={data.pastSelectedAchievements}
                                              keyExtractor={(item, index) => item.achievement.name.toString()}
                                              renderItem={({item}) => {
                                                  return <this.AchievementPreview key={item.name}
                                                                                  achievementSelection={item}/>
                                              }
                                              }
                                    />
                                </Content>
                            )
                        }}
                    </Query>


                }
                <Button full info onPress={() => {
                    this.setState({showArchive: !this.state.showArchive})
                }}>
                    <Text>
                        {this.state.showArchive ? L.get("show_current_achievements") : L.get("show_achievement_archive")}
                    </Text>
                </Button>
            </Container>
        )
    }
}

class TestPopUp extends Component {
    render() {
        let {} = this.props;
        return (
            <Button block info onPress={() => this.popUp.open()}>
                <Text>
                    Test PopUp
                </Text>
            </Button>
        )
    }
}