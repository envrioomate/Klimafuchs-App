import React, {Component, Fragment} from 'react';
import {FlatList, Image, StyleSheet, View, Dimensions} from "react-native";
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

const CollectedBadge = ({completion}) => {
    const badge = completion.seasonPlanChallenge.challenge;
    const icon = badge.icon;
    const iconTint = completionLevelToColor(completion);
    //TODO Badge Border und text beschreibung +  completion text + externalLink
    return (
        <Fragment>
            <View style={{margin: 2}}>
            <Image style={{backgroundColor: iconTint, ...styles.collected}}
                   source={icon ? {uri: icon.url + '?date=' + (new Date()).getHours()} : require('../../../assets/image_select.png')}
                    resizeMode="contain"
            />
            </View>
        </Fragment>
    )
};

export default class BadgeCollectionComponent extends Component {
    static navigationOptions = {
        title: 'Abzeichen',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
        ),
    };



    render() {
        return (
            <Body style={{ backgroundColor: '#fff'}}>
                <Query query={COMPLETED_BADGES}>
                    {({loading, error, data, refetch}) => {
                        if (loading) return (
                            <Container>
                                <Spinner/>
                            </Container>
                        );
                        if (error) return <Text>Error {error.message}</Text>;
                        const completions = data.getCompletedChallenges;
                        let shownCompletions = completions.filter(c =>  c.challengeGoalCompletionLevel !=="MIN");
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
        width: (Dimensions.get('window').width / 3) - 10 ,
        height: (Dimensions.get('window').width / 3) - 10,
        borderRadius: 5,
        padding: 20,
    },
});