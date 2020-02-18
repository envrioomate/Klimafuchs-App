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
import {Mutation, Query} from "react-apollo";
import {COMPLETE_ACHIEVEMENT, CURRENTLY_SELECTED_ACHIEVEMENTS, SELECT_ACHIEVEMENT} from "../../network/Badges.gql";
import {FlatList, StyleSheet, View} from "react-native";
import material from "../../../native-base-theme/variables/material";


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
            achievementCardItem: {
            },
            achievementCard: {
            }
        })
    };


    state = {
        selectedAchievements: new Set()
    };

    AchievementPreview = ({achievementSelection}) => {
        let {id, achievement, achievementCompletions} =  achievementSelection;
        let achievementWasCompleted = achievementCompletions.length > 0;

        let cardStyle = achievementWasCompleted ?
            this.styles.completed
                : this.styles.default;
        return (
            <Card transparent={achievementWasCompleted} style={this.styles.achievementCard}
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
                        {this.state.selectedAchievements.has(achievement) ?
                            <Button disabled>
                                <Text><Icon name="md-checkmark" style={{color: '#fff', fontSize: 18}}/> Ausgewählt</Text>
                            </Button>
                            :
                            <Mutation
                                mutation={COMPLETE_ACHIEVEMENT}
                                refetchQueries={[{
                                    query: CURRENTLY_SELECTED_ACHIEVEMENTS
                                }]}
                            >
                                {(completeAchievement, {loading, error, refetch}) => (

                                    <Button
                                        onPress={async () => {

                                            this.setState({loading: true});
                                            console.log(achievement.name)
                                            let completion = await completeAchievement({
                                                variables: {
                                                    achievementSelectionId: id,
                                                },
                                            }).catch(err => {
                                                this.setState({loading: false});

                                                console.log(err)
                                            });
                                            this.setState({
                                                loading: false,
                                            });


                                        }}>
                                        <Text>Complete!</Text>

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
        return (
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
                        console.log(data.currentlySelectedAchievements)
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