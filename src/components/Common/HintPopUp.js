import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback} from "react-native";

export class HintPopUp extends Component {

    state = {
        visible: false
    };

    dismiss = () => {
        this.setState({visible: false})
    };

    open = () => {
        this.setState({visible: true})
    };

    render() {

        const {visible} = this.state;

        if (!visible) return null;

        return (
            <TouchableWithoutFeedback style={styles.overlay} onPress={() => {
                this.dismiss()
            }}>
                <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
                    <Text>
                        Hint Popup
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

}

export const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        opacity: 0.9,
    },
    text: {
        width: "20%",
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    },
});