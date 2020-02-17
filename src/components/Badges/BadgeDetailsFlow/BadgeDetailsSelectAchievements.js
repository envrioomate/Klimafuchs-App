import React, {Component, Fragment} from "react";
import {Body, Card, CardItem, Button, Container, Text, Spinner} from "native-base";
import material from "../../../../native-base-theme/variables/material";
import {FlatList, View} from "react-native";
import {LocalizationProvider as L} from "../../../localization/LocalizationProvider";
import {Mutation} from "react-apollo";
import {SELECT_ACHIEVEMENT} from "../../../network/Badges.gql";

export class BadgeDetailsSelectAchievements extends Component {
    AchievementPreview = ({achievement}) => {
        return (
            <Card>
                <CardItem>
                <Text>
                    {achievement.title}
                </Text>
                </CardItem>
                <CardItem>
                <Text>
                    {achievement.text}
                </Text>
                </CardItem>
                <CardItem>
                <Text>
                    {achievement.score}
                </Text>
                </CardItem>
                <CardItem>
                    <Mutation mutation={SELECT_ACHIEVEMENT}>
                        {(selectAchievement, {loading, error, refetch}) => (

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

                                        this.setState({loading: true});

                                        let completion = await selectAchievement({
                                            variables: {
                                                achievementName: "temp"
                                            },
                                        }).catch(err => {
                                            this.setState({loading: false});

                                            console.log(err)
                                        });
                                        this.setState({loading: false});

                                    }}>
                                <Text>Wählen!</Text>

                            </Button>
                        )}
                    </Mutation>
                </CardItem>
            </Card>
        )
    }

    render() {
        let {options, navigation, route} = this.props;
        let {badge} = route.params; //
        let achievements = badge.challenge.achievements;
        console.log("badge, achievments: ", badge, achievements);
        return (
            <Fragment>
                <Container transparent style={{backgroundColor: material.brandInfo}}>
                    <Body>
                        <Text>Achievments</Text>

                        <FlatList style={{flex: 1}}
                                  data={achievements}
                                  keyExtractor={(item, index) => item.name.toString()}
                                  renderItem={({item}) => {
                                      return <this.AchievementPreview key={item.name} achievement={item}/>
                                  }
                                  }
                        />
                    </Body>
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
                            <Text>{L.get("select_achievements")}</Text>

                        </Button>

                    </View>
                </Container>
            </Fragment>
        )
    }
}