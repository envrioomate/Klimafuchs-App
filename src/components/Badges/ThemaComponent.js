import React, {Component, Fragment} from "react";
import {Body, Content, H1, Title, Text} from "native-base";
import {StyleSheet} from "react-native";
import Markdown from 'react-native-simple-markdown'

export class ThemaComponent extends Component {
    render() {
        let {thema} = this.props;
        return (
            <Fragment>
                <Content style={styles.themaContainer}>
                    <H1 style={styles.title}>{thema.title}</H1>

                    <Markdown style={markdownStyles}>
                        {thema.text}
                    </Markdown>

                </Content>
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    themaContainer: {
        flex: 1,
        margin: 10,
    },
    title: {
        marginBottom: 3
    },
    text: {

    }
});


const markdownStyles = {
    heading1: {
        fontSize: 24,
        color: 'purple',
    },
    link: {
        color: 'pink',
    },
    mailTo: {
        color: 'orange',
    },
    text: {
        color: '#555555',
    },
}