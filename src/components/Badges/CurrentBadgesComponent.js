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


export class CurrentBadgesComponent extends Component {
    static navigationOptions = {
        title: 'Thema',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
        ),
    };
    render() {
        return (
            <Body>
                <Text>Thema</Text>
            </Body>
        )
    }
}