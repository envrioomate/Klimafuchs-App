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


export default class AchievementComponent extends Component {
    static navigationOptions = {
        title: 'Achievments',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
        ),
    };
    render() {
        return (
            <Body>
                <Text>Achievments</Text>
            </Body>
        )
    }
}