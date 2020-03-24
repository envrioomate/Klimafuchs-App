import React, {Component} from 'react';
import {Body, Button, Card, CardItem, Container, Icon, Left, Right, Spinner, Text} from 'native-base';
import {Mutation, Query} from "react-apollo";
import {COMPLETE_ACHIEVEMENT, CURRENTLY_SELECTED_ACHIEVEMENTS, GET_SCORE} from "../../../network/Badges.gql";
import {FlatList, StyleSheet} from "react-native";
import material from "../../../../native-base-theme/variables/material";
import {AnimatedAchievementContainer} from "./AnimatedAchievementContainer";
import {HintPopUp} from "../../Common/HintPopUp";


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
        selectedAchievements: new Set()
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

    sortCompletedness = (a,b) => {
        return a.achievementCompletions.length - b.achievementCompletions.length
    };

    sortSelectedAt = (a,b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
    };

    render() {
        return (
            <Container transparent>
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
                            <FlatList style={{flex: 1}}
                                      data={data.currentlySelectedAchievements}
                                      keyExtractor={(item, index) => item.achievement.name.toString()}
                                      renderItem={({item}) => {
                                          return <this.AchievementPreview key={item.name} achievementSelection={item}/>
                                      }
                                      }
                            />
                        )
                    }}
                </Query>
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