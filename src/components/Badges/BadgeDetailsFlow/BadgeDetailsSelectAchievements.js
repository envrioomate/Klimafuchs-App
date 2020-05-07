import React, {Component, Fragment} from "react";
import {Body, Button, Card, CardItem, Container, Icon, Left, Right, Spinner, Text} from "native-base";
import {FlatList, StyleSheet, View} from "react-native";
import {Mutation, Query} from "react-apollo";
import {CURRENTLY_SELECTED_ACHIEVEMENTS, DESELECT_ACHIEVEMENT, SELECT_ACHIEVEMENT} from "../../../network/Badges.gql";
import material from "../../../../native-base-theme/variables/material";
import {Util} from "../../../util";
import {LocalizationProvider as L} from "../../../localization/LocalizationProvider";

export class BadgeDetailsSelectAchievements extends Component {
    state = {
        selectedAchievements: new Set()
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
        selected: StyleSheet.create({
            achievementCardItem: {
                backgroundColor: '#b5b5b5'
            },
            achievementCard: {
                backgroundColor: '#b5b5b5'
            }

        }),
        default: StyleSheet.create({
            achievementCardItem: {
            },
            achievementCard: {
            }
        })
    };

    AchievementPreview = ({achievement, previousSelectedAchievements}) => {

        const achievementSelection = previousSelectedAchievements ? previousSelectedAchievements.filter(a => a.achievement.name === achievement.name) : null;
        const achievementWasSelected = achievementSelection.length > 0;
        const achievementWasCompleted = achievementWasSelected ? achievementSelection[0].achievementCompletions ? achievementSelection[0].achievementCompletions.length > 0 : false : false; //TODO consider failed achievements

        let cardStyle = achievementWasCompleted ?
            this.styles.completed
            : achievementWasSelected ?
                this.styles.selected
                : this.styles.default;
        return (
            <Card transparent={achievementWasCompleted || achievementWasSelected} style={this.styles.achievementCard}
            >
                <CardItem header style={cardStyle.achievementCardItem}>
                    <Text>
                        {achievement.title}
                    </Text>
                </CardItem>
                <CardItem style={cardStyle.achievementCardItem}>
                    <Body>
                        <Text>
                            {achievement.text}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem footer style={cardStyle.achievementCardItem}>
                    <Left>
                        <Text>
                            {achievement.score} Punkte
                        </Text>
                    </Left>
                    <Right>
                        {(this.state.selectedAchievements.has(achievement) || achievementWasSelected) ?
                            achievementWasCompleted ?
                                <Button disabled>
                                    <Text><Icon name="md-checkmark" style={{color: '#fff', fontSize: 18}}/> Ausgewählt</Text>
                                </Button>
                                :
                                <Mutation
                                    mutation={DESELECT_ACHIEVEMENT}
                                    refetchQueries={[{
                                        query: CURRENTLY_SELECTED_ACHIEVEMENTS
                                    }]}
                                >
                                    {(deselectAchievement, {loading, error, refetch}) => (

                                        <Button
                                            warning
                                            onPress={async () => {
                                                this.setState({loading: true});
                                                if (this.state.selectedAchievements.has(achievement)) {
                                                    this.state.selectedAchievements.delete(achievement)
                                                }

                                                if (achievementWasSelected) {
                                                    await deselectAchievement({
                                                        variables: {
                                                            selectionId: achievementSelection[0].id

                                                        },
                                                    }).catch(err => {
                                                        this.setState({loading: false});

                                                        console.log(err)
                                                    });
                                                    this.setState({
                                                        loading: false,
                                                    });
                                                }
                                            }}>
                                            <Text>Abwählen!</Text>

                                        </Button>
                                    )}
                                </Mutation>
                            :
                            <Mutation
                                mutation={SELECT_ACHIEVEMENT}
                                refetchQueries={[{
                                    query: CURRENTLY_SELECTED_ACHIEVEMENTS
                                }]}
                            >
                                {(selectAchievement, {loading, error, refetch}) => (

                                    <Button
                                        onPress={async () => {

                                            this.setState({loading: true});
                                            console.log(achievement.name)
                                            let completion = await selectAchievement({
                                                variables: {
                                                    achievementName: achievement.name,
                                                },
                                            }).catch(err => {
                                                this.setState({loading: false});

                                                console.log(err)
                                            });
                                            this.setState({
                                                loading: false,
                                                selectAchievements: this.state.selectedAchievements.add(achievement)
                                            });


                                        }}>
                                        <Text>Wählen!</Text>

                                    </Button>
                                )}
                            </Mutation>
                        }
                    </Right>
                </CardItem>

            </Card>
        )
    }

    render() {
        let {options, navigation, route} = this.props;
        let {badge, completion} = route.params; //
        completion = completion || badge.challengeCompletion ;
        let achievements = badge.challenge.achievements;
        console.log(completion, route.params)
        let currentCompletionLevel = Util.CompletionLevelToNumber(completion.challengeGoalCompletionLevel);

        let eligebleAchievements = achievements.filter(value => {
            let maxCompletion = Util.CompletionLevelToNumber(value.maxCompletion);
            return maxCompletion > currentCompletionLevel;
        });
         // TODO L.get
        return (
            <Fragment>
                <Container transparent>
                    <Query query={CURRENTLY_SELECTED_ACHIEVEMENTS}>
                        {({loading, error, data, refetch}) => {
                            if (loading) return (
                                <Container>
                                    <Spinner/>
                                </Container>
                            );
                            if(eligebleAchievements.length === 0) {
                                return <Container><Text style={{margin: 10}}>{L.get("no_achievements_for_level")}</Text></Container>
                            }
                            if (error) return <Text>Error {error.message}</Text>;
                            return (
                                <FlatList style={{flex: 1}}
                                          data={eligebleAchievements}
                                          keyExtractor={(item, index) => item.name.toString()}
                                          renderItem={({item}) => {
                                              return <this.AchievementPreview key={item.name} achievement={item}
                                                                              previousSelectedAchievements={data.currentlySelectedAchievements}/>
                                          }
                                          }
                                />
                            )
                        }}
                    </Query>
                    <View style={{backgroundColor: '#fff', width: "100%", height: 64}}>

                        <Button
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                margin: 10,
                                width: "95%",
                                height: 200
                            }}
                            onPress={async () => {
                                navigation.navigate("Main", {badge: badge})

                            }}>
                            <Text>Fertig</Text>

                        </Button>

                    </View>
                </Container>
            </Fragment>
        )
    }
}
