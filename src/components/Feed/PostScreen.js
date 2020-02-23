import React, {Component} from 'react';
import {Body, Button, Container, Header, Icon, Left, Right, Text, Title} from "native-base";
import {Query} from "react-apollo";
import {LOAD_POST} from "../../network/Feed.gql";
import {AppLoading} from "expo";
import PostCard from "./PostComponent"
import SafeAreaView from 'react-native-safe-area-view';
import {StyleSheet} from "react-native";
import material from "../../../native-base-theme/variables/material";


export default class PostScreen extends Component {

    render() {
        console.log(this.props.route);

        let postId
        if (this.props.route.params && this.props.route.params.params) {
            postId = this.props.route.params.params.postId; // Yes, this is getting this.props.route.params.params, this is intentional
        } else {
            postId = this.props.route.params ? this.props.route.params.screen : this.props.route.state.routes[0].name;
        }
        let navigation = this.props.navigation;

        console.log("postID: ", postId)

        return (
            <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>


                <Query query={LOAD_POST} variables={{postId: postId}}>
                    {({loading, error, data, refetch}) => {
                        if (loading) return (
                            <Container>
                                <Header>
                                    <Left>
                                        <Button transparent
                                                onPress={() => navigation.navigate("Feed")}>
                                            <Icon name='arrow-back'/>
                                        </Button>
                                    </Left>
                                    <Body/>
                                    <Right/>
                                </Header>
                                <AppLoading/>
                            </Container>

                        );
                        console.log(data)
                        if (error) {
                            console.log(error);
                            return (
                                <Container>
                                    <Header>
                                        <Left>
                                            <Button transparent
                                                    onPress={() => navigation.navigate("Feed")}>
                                                <Icon name='arrow-back'/>
                                            </Button>
                                        </Left>
                                        <Body/>
                                        <Right/>
                                    </Header>
                                    <Text>`Error ${error.message}`</Text>
                                </Container>
                            );
                        }
                        if (!data.post) {
                            return (
                                <Container>
                                    <Header>
                                        <Left>
                                            <Button transparent
                                                    onPress={() => navigation.navigate("Feed")}>
                                                <Icon name='arrow-back'/>
                                            </Button>
                                        </Left>
                                        <Body/>
                                        <Right/>
                                    </Header>
                                    <Text>Beitrag nicht gefunden</Text>
                                </Container>
                            );
                        }

                        return (
                            <Container>
                                <Header>
                                    <Left>
                                        <Button transparent
                                                onPress={() => navigation.navigate("Feed")}>
                                            <Icon name='arrow-back'/>
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Title>{data.post.postTitle}</Title>
                                    </Body>
                                    <Right/>
                                </Header>
                                <PostCard post={data.post} commentRefetch={refetch}
                                          close={() => this.props.navigation.navigate('Feed')}/>
                            </Container>

                        )
                    }}
                </Query>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: material.brandInfo
    }
});

