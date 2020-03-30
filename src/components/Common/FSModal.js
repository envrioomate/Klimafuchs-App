import React, {Component, Fragment} from 'react';
import {StyleSheet, View} from 'react-native'
import ReactNativeModal from "react-native-modal";
import PropTypes from 'prop-types';

export class FSModal extends Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
        body: PropTypes.element.isRequired,
    };

    state = {
        modalVisible: false
    };
    closeModal = () => {
        this.setState({modalVisible: false})
    };
    openModal = () => {
        this.setState({modalVisible: true})
    };

    render() {
        let {children, body, darken} = this.props;
        //body.props = Object.assign(body.props, ...other);
        return (
            <Fragment>
                <ReactNativeModal
                    animationType={darken ? "fade" : "slide"}
                    transparent={true}
                    backdropColor="black"
                    backdropOpacity={0.7}
                    visible={this.state.modalVisible}
                    style={styles.modal}
                    onBackdropPress={() => {
                        this.closeModal()
                    }}
                    onRequestClose={() => {
                        this.closeModal()
                    }}>

                    {body}

                </ReactNativeModal>
                {children}
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1
    },
});

export class FSModalContentBase extends Component {
    static propTypes = {
        requestModalClose: PropTypes.func.isRequired,
    };

    closeParent = this.props.requestModalClose;
}