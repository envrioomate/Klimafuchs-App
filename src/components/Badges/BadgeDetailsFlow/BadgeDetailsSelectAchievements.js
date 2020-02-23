import React, {Component, Fragment} from "react";
import {Body, Button, Card, CardItem, Container, Icon, Left, Right, Spinner, Text} from "native-base";
import {FlatList, StyleSheet, View} from "react-native";
import {Mutation, Query} from "react-apollo";
import {CURRENTLY_SELECTED_ACHIEVEMENTS, SELECT_ACHIEVEMENT} from "../../../network/Badges.gql";
import material from "../../../../native-base-theme/variables/material";

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

        const achievementSelecton = previousSelectedAchievements ? previousSelectedAchievements.filter(a => a.achievement.name === achievement.name) : null;
        const achievementWasSelected = achievementSelecton.length > 0;
        const achievementWasCompleted = achievementWasSelected ? achievementSelecton[0].achievementCompletions ? achievementSelecton[0].achievementCompletions.length > 0 : false : false; //TODO consider failed achievements

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
                        {this.state.selectedAchievements.has(achievement) || achievementWasSelected ?
                            <Button disabled>
                                <Text><Icon name="md-checkmark" style={{color: '#fff', fontSize: 18}}/> Ausgewählt</Text>
                            </Button>
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
        let achievements = badge.challenge.achievements;
        console.log(completion, route.params)
        return (
            <Fragment>
                <Container transparent>
                    <Text>Achievments</Text>
                    <Query query={CURRENTLY_SELECTED_ACHIEVEMENTS}>
                        {({loading, error, data, refetch}) => {
                            if (loading) return (
                                <Container>
                                    <Spinner/>
                                </Container>
                            );
                            if (error) return <Text>Error {error.message}</Text>;
                            return (
                                <FlatList style={{flex: 1}}
                                          data={achievements}
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
