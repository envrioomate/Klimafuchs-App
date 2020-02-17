import React, {Component, Fragment} from 'react';
import {Body, Card, CardItem, H3, Icon, Right, Text} from 'native-base';
import {FlatList, Image, StyleSheet, View} from 'react-native'
import material from "../../../native-base-theme/variables/material";
import {useNavigation} from '@react-navigation/native';
import {completionLevelToColor} from "./BadgeUtils";

export default class BadgePreviewListComponent extends Component {
    render() {
        let {badges, refetch} = this.props;
        return (
            <Fragment>
                <FlatList style={{flex: 1}}
                          data={badges}
                          keyExtractor={(item, index) => item.id.toString()}
                          renderItem={({item}) => {
                              return <BadgePreview key={item.id} badge={item} refetch={refetch}/>
                          }
                          }
                />
            </Fragment>
        )
    }
};
export const ChallengeGoalCompletionLevel = Object.freeze({
    MIN: 0, MED: 1, GOOD: 2, MAX: 3
});

function BadgePreview(props) {
    let {badge, refetch} = props;
    const navigation = useNavigation();
    return (
        <View style={styles.Challenge}>
            <Card>
                <CardItem button onPress={() => {
                    navigation.navigate("BadgeDetails", {
                        screen: 'BadgeDetailsText',
                        params: {badge: badge}
                    })
                }}>
                    <Body style={{flex: 3, flexDirection: 'column',}}>

                        <H3>{badge.challenge.title}</H3>
                        <Body style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            marginTop: 2,
                            width: '100%'
                        }}>
                            <Icon name="md-arrow-dropright" size={5}
                                  style={{fontSize: 20, marginRight: 10, color: 'gray'}}/>
                            <Text style={{fontSize: 12, color: material.textLight}}>
                                {badge.challenge.text.length > 40
                                    ? `${badge.challenge.text.substr(0, 40)}...`
                                    : badge.challenge.text}
                            </Text>
                        </Body>
                    </Body>
                    <Right>
                        <Image style={{
                            width: 50,
                            height: 50,
                            tintColor: completionLevelToColor(badge.challengeCompletion)
                        }}
                               source={badge.challenge.icon ? {uri: badge.challenge.icon.url+ '?date=' + (new Date()).getHours()} : require('../../../assets/image_select.png')}/>
                    </Right>
                </CardItem>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    themaContainer: {
        flex: 1,
        margin: 10,
    },
    title: {
        marginBottom: 3
    },
    text: {},
    icon: {
        width: 50, height: 50
    }
});
