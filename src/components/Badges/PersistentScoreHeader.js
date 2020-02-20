import React, {Component, Fragment} from "react";
import {Body, Button, Container, Header, Icon, Left, Right, Spinner, Text, Title} from "native-base";
import material from "../../../native-base-theme/variables/material";
import {Query} from "react-apollo";
import {GET_SCORE} from "../../network/Badges.gql";
import AnimateNumber from 'react-native-countup'; 

import {StyleSheet, View, Animated} from "react-native";


class ScoreContainer extends Component {

    state = {
        prevScore: 0,
        hasUpdated: false
    };

    componentDidMount() {
        let {score} = this.props;
        this.setState({intialScore: score})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.score !== prevProps.score)
            this.setState({prevScore: prevProps.score, hasUpdated:true})
    }


    render() {
        let {score} = this.props;
        let {prevScore} = this.state;
        console.log("animate score to ", score);
        return(
            <Title>
                {this.state.hasUpdated ?
                    <AnimateNumber value={score} initial={prevScore} formatter={(val) => {
                    return parseFloat(val).toFixed(0)
                }} timing="easeOut" onProgress={(progress) => {console.log("progress: ", progress)}} /> :
                    score
                } Punkte
            </Title>
        )
    }
}

export class PersistentScoreHeader extends Component {

    render() {
        let {options, navigation} = this.props;
        return (
            <Fragment>
                <Header transparent style={{backgroundColor: material.brandInfo}}>
                    <Left/>

                    <Query query={GET_SCORE}>
                        {({loading, error, data, startPolling, stopPolling}) => {
                            if (loading) return (
                                <Body>
                                    <Spinner/>
                                </Body>
                            );
                            if (error) return <Text>Error {error.message}</Text>;
                            console.log(data.score);
                            startPolling(100)
                            setTimeout(stopPolling, 2000);
                            return (
                                <Body>
                                    <ScoreContainer score={data.score}/>
                                </Body>
                            )
                        }}
                    </Query>
                    <Right>
                    </Right>
                </Header>
            </Fragment>
        )
    }
}