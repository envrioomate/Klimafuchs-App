import React, {Component, Fragment} from "react";
import {Body, Header, Left, Right, Title} from "native-base";
import material from "../../../native-base-theme/variables/material";

export class PersistentScoreHeader extends Component {
    render() {
        let {options, navigation} = this.props;
        return (
            <Fragment>
                <Header transparent style={{backgroundColor: material.brandInfo}}>
                    <Left/>
                    <Body>
                        <Title>Persistent Score Placeholder</Title>
                    </Body>
                    <Right/>
                </Header>
            </Fragment>
        )
    }
}