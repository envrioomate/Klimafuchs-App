import React, {Component, createContext, Fragment} from "react";
import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";

//TODO Consumer
const HintPopUpContext = createContext();


export class HintPopUpProvider extends Component {

    state = {
        visible: false,
        content: null
    };

    dismiss = () => {
        this.setState({visible: false})
    };

    open = ({content}) => {
        this.setState({visible: true})
    };

    render () {
        const {children} = this.props;
        return (
            <HintPopUpContext.Provider
                value={{
                    state: this.state,

                }}
                >
                <Fragment>
                    {children}

                </Fragment>
            </HintPopUpContext.Provider>
        )
    }


}


export function HintPopUp() {
    return (
        <HintPopUpContext.Consumer>
            {context => {
                const {visible, content} = context.state;

                if (!visible) return null;

                return (
                    <TouchableWithoutFeedback style={styles.overlay} onPress={() => {
                        context.dismiss()
                    }}>
                        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                            {context.content ||
                            <Text>Hint Pop Up</Text>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                )
            }}

        </HintPopUpContext.Consumer>

    )
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