import React, {Fragment} from 'react';
import {RefreshControl, Text, View} from 'react-native';
import {Body, Button, Container, Content, List, ListItem, Right, Spinner} from "native-base";
import {Query} from "react-apollo";
import {CURRENT_USER_ID, LEADERBOARD} from "../../network/Teams.gql";
import * as env from "../../env"

export class LeaderBoardScreen extends React.Component {
    static navigationOptions = {
        title: 'Leaderboard',
    };

    state = {
        refreshing: false,
        endReached: false,
        sizeFilter: "SOLO",
        user: undefined
    };

    pageSize = 10;


    render() {
        return (
            <Query query={CURRENT_USER_ID}>
                {({loading, error, data}) => {
                    if (loading) return <Spinner/>;
                    if (error) return <Text>{error}</Text>
                    const userId = data.getCurrentUserId.id;
                    return (
                        <Container style={{flex: 1}}>
                            <Query query={LEADERBOARD}
                                   variables={{
                                       connectionArgs: {first: this.pageSize},
                                       teamSize: this.state.sizeFilter
                                   }}>
                                {({loading, error, data, refetch, fetchMore}) => {
                                    if (loading) {
                                        return <Text>Loading...</Text>;
                                    }
                                    if (error) return <Text>{error.message}</Text>;
                                    if (data) {
                                        if (data.getLeaderBoard.page.edges.length > 0) {
                                            return (
                                                <Fragment>
                                                    {this.renderLeaderBoard(data.getLeaderBoard.page.edges, refetch, this.renderFetchMoreButton(data, loading, fetchMore), userId)}
                                                </Fragment>
                                            );
                                        } else {
                                            return (
                                                <Fragment>
                                                    <Text>hm...</Text>
                                                    {this.renderFetchMoreButton(data, loading, fetchMore)}
                                                </Fragment>
                                            )
                                        }
                                    }
                                }}
                            </Query>
                        </Container>
                    )
                }}
            </Query>
        );
    }

    renderFetchMoreButton(data, loading, fetchMore) {
        return (
            <Button full light disabled={this.state.refreshing || this.state.endReached} onPress={() => {
                const lastCursor = data.getLeaderBoard.page.edges[data.getLeaderBoard.page.edges.length - 1].cursor;
                console.log(lastCursor)
                fetchMore({
                    variables: {
                        connectionArgs: {
                            first: this.pageSize,
                            after: lastCursor
                        },
                        teamSize: this.state.sizeFilter
                    },
                    updateQuery: (prev, {fetchMoreResult}) => {
                        if (!fetchMoreResult) return prev;
                        if (fetchMoreResult.getLeaderBoard.page.edges.length === 0) {
                            console.log("no more data");
                            this.setState({endReached: true})
                        }
                        return Object.assign(data.getLeaderBoard.page, prev, {
                            edges: [...prev.getLeaderBoard.page.edges, ...fetchMoreResult.getLeaderBoard.page.edges]
                        });
                    }
                })
            }}><Text>load more</Text></Button>
        )
    }

    renderLeaderBoard(leaderBoard, refetch, lbutton, userId) {
        return (
            <Container style={{flex: 1}}>
                <Content
                    style={{
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                    refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({refreshing: true});
                            refetch().then(this.setState({refreshing: false}))
                        }}
                    />
                    }>
                    <List>
                        {leaderBoard.map((team, index) => {
                            return (
                                <TeamCard key={team.cursor} index={index} team={team} currentUserId={userId}/>
                            )
                        })}
                    </List>
                    {lbutton}
                </Content>
            </Container>
        )
    };
}


const TeamCard = ({index, team, currentUserId}) => {
    let {node, cursor} = team;
    const teamAvatarUrl =
        node.avatar
            ? `${env.dev.API_IMG_URL}${node.avatar.filename}`
            : `${env.dev.API_IMG_URL}avatar_default.png`;
    const isMember = node.members.some((member) => member.id === currentUserId);
    const pendingRequest = false; // TODO implement checking for pending team join request

    const rightContent = isMember
        ? <Fragment>
            <Button transparent onPress={() => {
                console.log("moooo")
            }}>
                <Text>
                    Mitglied
                </Text>
            </Button>
        </Fragment>
        : pendingRequest
            ? <Fragment>
                <Button transparent onPress={() => {
                    console.log("moooo")
                }}>
                    <Text>
                        Anfrage gesendet
                    </Text>
                </Button>
            </Fragment>
            : <Fragment>
                <Button transparent onPress={() => {
                    console.log("moooo")
                }}>
                    <Text>
                        Beitreten
                    </Text>
                </Button>
            </Fragment>

    return (
        <ListItem>
            <Body style={{height: '100%'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View>
                    <Text style={{color: '#008523'}}>Teamrang: </Text>
                    <Text>Teamname: </Text>
                </View>
                <View>
                    <Text>{node.place}</Text>
                    <Text>{node.name}</Text>
                </View>
            </View>
            </Body>
            <Right style={{}}>
                <Text> </Text>
                {rightContent}
            </Right>
        </ListItem>
    )
}

