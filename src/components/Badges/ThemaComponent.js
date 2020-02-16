import React, {Component, Fragment} from "react";
import {Body, Content, H1, Title, Text} from "native-base";
import {StyleSheet} from "react-native";

export class ThemaComponent extends Component {
    render() {
        let {thema} = this.props;
        return (
            <Fragment>
                <Content style={styles.themaContainer}>
                    <H1 style={styles.title}>{thema.title}</H1>
                    <Text style={styles.text}>{thema.text}</Text>

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