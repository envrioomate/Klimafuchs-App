import React, {Component, Fragment} from "react";
import {Body, Container, Header, Left, Right, Spinner, Text, Title} from "native-base";
import material from "../../../native-base-theme/variables/material";
import {Query} from "react-apollo";
import {GET_SCORE} from "../../network/Badges.gql";
import AnimateNumber from 'react-native-animate-number';

class ScoreContainer extends Component {

    state = {
        prevScore: 0,
        hasUpdated: false
    }
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
            <Text>
                {this.state.hasUpdated ?
                    <AnimateNumber startAt={prevScore}  value={score} formatter={(val) => {
                    return parseFloat(val).toFixed(0)
                }} timing="easeOut"/> :
                    score
                }
            </Text>
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
                    <Body>
                        <Title>Persistent Score Placeholder</Title>
                    </Body>
                    <Query query={GET_SCORE}>
                        {({loading, error, data, startPolling, stopPolling}) => {
                            if (loading) return (
                                <Container>
                                    <Spinner/>
                                </Container>
                            );
                            if (error) return <Text>Error {error.message}</Text>;
                            console.log(data.score);
                            startPolling(100)
                            setTimeout(stopPolling, 2000);
                            return (
                                <Right>
                                    <ScoreContainer score={data.score}/>
                                </Right>
                            )
                        }}
                    </Query>


                </Header>
            </Fragment>
        )
    }
}