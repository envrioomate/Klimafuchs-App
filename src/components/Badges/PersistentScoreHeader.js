import React, {Component, Fragment} from "react";
import {Body, Container, Header, Left, Right, Spinner, Text, Title} from "native-base";
import material from "../../../native-base-theme/variables/material";
import {Query} from "react-apollo";
import {GET_SCORE} from "../../network/Badges.gql";

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
                            setTimeout(stopPolling, 2000)
                            return (
                                <Right>
                                    <Text>
                                        {data.score}
                                    </Text>
                                </Right>
                            )
                        }}
                    </Query>
                </Header>
            </Fragment>
        )
    }
}