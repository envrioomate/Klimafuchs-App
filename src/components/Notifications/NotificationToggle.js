import React, { Component} from "react";
import * as Permissions from "expo-permissions";
import {Mutation, Query} from "react-apollo";
import {
    IS_SUBSCRIBED_TO_NOTIFICATIONS,
    SUBSCRIBE_TO_NOTIFICATIONS,
    TEST_NOTIFICATION,
    UNSUBSCRIBE_FROM_NOTIFICATIONS
} from "../../network/UserData.gql";
import {Body, Button, Card, CardItem, Right, Spinner, Text, Toast} from "native-base";
import {Switch, View} from "react-native";
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";
import {Notifications} from "expo";

export class NotificationToggle extends Component {

    state = {
        hasPermission: false,
        loading: true,
        optimisticResult: false,
        pushToken: ''
    };

    _checkAndGetPermission = async () => {

        let {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            status = (await Permissions.askAsync(Permissions.NOTIFICATIONS)).status
        }
        this.setState({hasPermission: status === 'granted'});
    };

    _init = async () => {
        await this._checkAndGetPermission();
        await this._getPushToken();
        this.setState({loading: false});
    };

    componentDidMount() {
        this._init().catch(error => console.log(error));
    }

    toggleSubscription = (isSubscribed, pushToken, refetch) => {

        console.log({
            loading: this.state.loading,
            optimisticResult: this.state.optimisticResult,
            subscribtion: isSubscribed,
            isSubscribed: !!isSubscribed,
            targetValue: this.state.loading ? this.state.optimisticResult : !!isSubscribed
        });
        if (isSubscribed) {
            return (
                <Mutation mutation={UNSUBSCRIBE_FROM_NOTIFICATIONS}>
                    {(unsubscribe, {loading, error}) => {
                        if (loading) return (<Spinner/>)
                        return (
                            <Switch
                                value={this.state.loading ? this.state.optimisticResult : !!isSubscribed}
                                disabled={this.state.loading}
                                onValueChange={async () => {
                                    this.setState({loading: true, optimisticResult: false})
                                    await unsubscribe().then(() => {
                                        Toast.show({
                                            text: L.get("success_unsubscribing_from_notification")
                                        })

                                    }).catch(error => {
                                        Toast.show({
                                            text: L.get("error_unsubscribing_from_notification")
                                        })
                                    });
                                    refetch()

                                }}
                            />
                        )
                    }}
                </Mutation>
            )
        } else {
            return (
                <Mutation mutation={SUBSCRIBE_TO_NOTIFICATIONS} errorPolicy="all">
                    {(subscribe, {loading, error}) => {
                        if (error) console.log(error.graphQLErrors.map(({message}) => message));
                        return (
                            <Switch
                                value={this.state.loading ? this.state.optimisticResult : isSubscribed}
                                disabled={loading}
                                onValueChange={async () => {
                                    this.setState({loading: true, optimisticResult: true})
                                    await subscribe({
                                        variables: {
                                            pushToken
                                        },
                                    }).then(() => {
                                        Toast.show({
                                            text: L.get("success_subscribing_to_notification")
                                        })

                                    }).catch(error => {
                                        Toast.show({
                                            text: L.get("error_subscribing_to_notification")
                                        })
                                    });
                                    refetch()
                                }}
                            />
                        )
                    }}
                </Mutation>
            )
        }
    };

    render() {
        const {hasPermission, pushToken} = this.state;

        console.log({hasPermission, pushToken});

        return (
            <Query query={IS_SUBSCRIBED_TO_NOTIFICATIONS}>
                {({loading, error, data, refetch}) => {
                    if (loading) {
                        return (
                            <Switch disabled/>
                        )
                    }
                    return (
                        <Card transparent>
                            <CardItem>
                                <Body>
                                    <Text>{L.get("enable_notifications_now")}</Text>
                                </Body>
                                <Right>
                                    {this.toggleSubscription(data && data.isSubscribed, pushToken, refetch)}
                                </Right>
                            </CardItem>
                            {data && data.isSubscribed &&
                            <CardItem>
                                <Mutation  mutation={TEST_NOTIFICATION}>
                                    {(testNotification) => (
                                        <Body>
                                        <Button block light
                                                onPress={() => testNotification().catch(error => console.error(error))}>
                                            <Text>Mitteilungen testen</Text>
                                        </Button>
                                        </Body>
                                    )}
                                </Mutation>
                            </CardItem>
                            }
                        </Card>
                    )

                }}
            </Query>
        )
    }

    _getPushToken = async () => {
        const token = await Notifications.getExpoPushTokenAsync();
        this.setState({pushToken: token});
    }
}