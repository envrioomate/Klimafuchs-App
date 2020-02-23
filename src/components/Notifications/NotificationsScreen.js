import React, {Component, Fragment} from 'react';
import {Body, Card, CardItem, Container, Fab, H1, Header, Icon, Left, ListItem, Right, Text, Title} from "native-base";
import {FlatList, StyleSheet} from "react-native";
import material from "../../../native-base-theme/variables/material";
import {connect} from "react-redux";
import {Linking, Notifications} from "expo";
import {MaterialDialog} from "react-native-material-dialog";
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";
import SafeAreaView from 'react-native-safe-area-view';
import Swipeout from 'react-native-swipeout';
import Constants from "expo-constants";

import {NotificationToggle} from "../Profile/ProfileScreen";

const prefix = Linking.makeUrl('/');

const pkg = Constants.manifest.releaseChannel
    ? Constants.manifest.android.package  // When published, considered as using standalone build
    : "host.exp.exponent"; // In expo client mode


class NotificationsScreen extends Component {
    static navigationOptions = {
        title: 'Benachr.',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='md-notifications' style={{fontSize: 20, color: tintColor}}/>
        ),
    };

    state = {
        showDismissAllDialog: false
    };

    deleteRow = (notificationId) => {
        this.props.dispatch({type: 'NOTIFICATIONS/DELETE', notificationId});
        Notifications.dismissNotificationAsync(notificationId);
    }

    deleteAllNotifications = () => {
        let {notifications} = this.props;
        notifications.forEach((notification) => {
            this.props.dispatch({type: 'NOTIFICATIONS/DELETE', notificationId: notification.notificationId});
        })
        Notifications.dismissAllNotificationsAsync();
    };


    renderList = (notifications, navigation) => {
        return (
            <FlatList
                data={notifications}
                rightOpenValue={-75}
                keyExtractor={(item, index) => '' + index}
                renderItem={({item}) => <NotificationComponent
                    notification={item}
                    deleteRowCallback={this.deleteRow}
                    navigation={navigation}/>
                }
            />
        )
    };


    render() {
        let {notifications, navigation} = this.props;
        console.log("notifications: ", notifications);
        return (
            <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
                <Header>
                    <Left style={{flex: 1}}/>
                    <Body style={{paddingLeft: 10, flex: 6}}>
                        <Title>Benachrichtigungen</Title>
                    </Body>
                </Header>

                <Container>
                    {notifications.length > 0 ?
                        <Fragment>
                            {this.renderList(notifications, navigation)}
                            <Fab style={{backgroundColor: material.brandInfo}} position="bottomRight"
                                 onPress={() => this.setState({showDismissAllDialog: true})}>
                                <Fragment>
                                    <Icon name="md-close" style={{color: material.brandLight}}/>
                                    <MaterialDialog
                                        visible={this.state.showDismissAllDialog}
                                        cancelLabel={L.get('no')}
                                        onCancel={() => {
                                            this.setState({showDismissAllDialog: false})
                                        }}
                                        okLabel={L.get('yes')}
                                        onOk={async () => {
                                            this.deleteAllNotifications();
                                            this.setState({showDismissAllDialog: false});
                                        }}
                                        colorAccent={material.textLight}>
                                        <Text style={{color: material.textLight}}>
                                            {L.get('hint_dismiss_all_notifications')}
                                        </Text>
                                    </MaterialDialog>
                                </Fragment>
                            </Fab>
                        </Fragment>
                        :
                        <Fragment>
                            <Container>
                                <Body>
                                    <Card transparent>
                                        <CardItem>

                                    <H1>{L.get("notifications_list_empty")}</H1>
                                        </CardItem>
                                        <CardItem>
                                            <Body>
                                                <Text>{L.get("enable_notifications_now")}</Text>
                                            </Body>
                                            <Right>
                                                <NotificationToggle/>
                                            </Right>
                                        </CardItem>
                                    </Card>
                                </Body>
                            </Container>
                        </Fragment>}


                </Container>
            </SafeAreaView>
        );
    }
}

const NotificationComponent = ({notification, deleteRowCallback, navigation}) => {
    console.log(notification);
    let id = notification.notificationId;
    let {icon, body, title} = notification.data;

    console.log(id, icon, body, title)
    let swipeBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => {
            deleteRowCallback(id)
        }
    }];
    return (
        <Swipeout right={swipeBtns}>
            <ListItem style={styles.notificationListItem} disabled={!notification.data.path} onPress={() => {
                if (notification.data.path) Linking.openURL(prefix + notification.data.path);
            }}>
                <Left>
                    <Icon active name={icon || 'md-notifications-outline'}/>
                </Left>
                <Body style={{flex: 6, paddingLeft: 0, marginLeft: 0}}>
                    <Text style={{paddingLeft: 0, marginLeft: 0}}>
                        {title}
                    </Text>
                    <Text style={{paddingLeft: 0, marginLeft: 0}} note numberOfLines={2}>
                        {body}
                    </Text>
                </Body>
            </ListItem>
        </Swipeout>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: material.brandInfo
    },
    notificationListItem: {
        padding: 10,
        paddingLeft: 20,

    }
});

const mapStateToProps = (state) => {
    const {notifications} = state;
    return notifications;
};

export default connect(mapStateToProps)(NotificationsScreen)