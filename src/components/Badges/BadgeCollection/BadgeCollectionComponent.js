import React, {Component} from 'react';
import {Dimensions, FlatList, StyleSheet, View,} from "react-native";
import {Body, Container, Icon, Spinner, Text} from 'native-base';
import {Query} from "react-apollo";
import {COMPLETED_BADGES} from "../../../network/Badges.gql";
import {CollectedBadge} from "./CollectedBadge";

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

