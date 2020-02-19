import React, {Component, Fragment} from 'react';
import {FlatList, Image, StyleSheet, View} from "react-native";

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
    return (
        <Fragment>
            <Image style={{backgroundColor: iconTint, ...badgeScreenStyles.iconPreview}}
                   source={icon ? {uri: icon.url + '?date=' + (new Date()).getHours()} : require('../../../assets/image_select.png')}/>

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
            <Body>
                <Text>Abzeichen</Text>

                <Query query={COMPLETED_BADGES}>
                    {({loading, error, data, refetch}) => {
                        if (loading) return (
                            <Container>
                                <Spinner/>
                            </Container>
                        );
                        if (error) return <Text>Error {error.message}</Text>;
                        const completions = data.getCompletedChallenges;

                        return (
                            <FlatList
                                style={{flex: 1}}
                                data={completions}
                                keyExtractor={(item, index) => item.id.toString()}
                                renderItem={({item}) => {
                                    return <CollectedBadge completion={item}/>
                                }}
                                numColumns={3}
                            >
                            </FlatList>
                        )
                    }}
                    </Query>
            </Body>
        )
    }
}