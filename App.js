import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {Root, Spinner, StyleProvider} from 'native-base';
import LoginScreen from "./src/components/PreLogin/LoginScreen";
import SignUpScreen from "./src/components/PreLogin/SignUpScreen";
import CheckUserExistsScreen from "./src/components/PreLogin/CheckUserExistsScreen";
import {Provider as ReduxProvider} from "react-redux";
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import {persistor, store} from "./src/persistence/store"
import {PersistGate} from 'redux-persist/integration/react'

import {AppNav} from "./src/components/LoggedInScreen";
import {ForgotPasswordScreen} from "./src/components/PreLogin/ForgotPasswordScreen";
import {Notifications, Screen} from "expo";
import ApolloProvider from "react-apollo/ApolloProvider";
import client from "./src/network/client"
import Api from "./src/network/api";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

export default class AppRoot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    handleNotification = (notification) => {
        store.dispatch({type: 'NOTIFICATIONS/RECEIVE', notification});
        console.log("received notification: " + JSON.stringify(notification))
    };

    componentDidMount() {
        console.log(this.props)
        this._notificationSubscription = Notifications.addListener(this.handleNotification);
    }

    async componentWillMount() {
//        await Font.loadAsync({
//            Roboto: require("native-base/Fonts/Roboto.ttf"),
//            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
//            Ionicons: require("react-native-vector-icons/Fonts/Ionicons.ttf")
//       });
        this.setState({loading: false})
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <Spinner/>
                </View>
            )
        }
        return (
            <ReduxProvider store={store}>
                <PersistGate loading={<Spinner/>} persistor={persistor}>
                <ApolloProvider client={client}>
                    <StyleProvider style={getTheme(material)}>
                        <SafeAreaProvider forceInset={{ bottom: 'never' }} style={styles.safeArea}>
                            <Root style={styles.container}>
                                    <RootContainer uriPrefix='/app'/>
                            </Root>
                        </SafeAreaProvider>
                    </StyleProvider>
                </ApolloProvider>
                </PersistGate>
            </ReduxProvider>
        )
    }
}


class AuthLoadingScreen extends Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    async _bootstrapAsync() {
        console.log("Is logged in?");
        const userToken = await AsyncStorage.getItem('token');
        console.log(userToken);
        await Api.checkTokenValid(userToken, async (res) => {
            console.log(`Token valid!`);
            this.props.navigation.navigate('App');
        }, async (err) => {
            console.log(err);
            await AsyncStorage.removeItem('uId');
            await AsyncStorage.removeItem('token');
            await client.clearStore();
            console.log(`Token invalid! Cleared token store, reauthenticating...`);
            this.props.navigation.navigate('Auth');
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <Spinner/>
            </View>
        )
    }

}

const AuthNav = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen" headerMode="none">
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
        </Stack.Navigator>
    )
};

const RootContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthLoading" headerMode="none">
                <Stack.Screen name="AuthLoading" component={AuthLoadingScreen}/>
                <Stack.Screen name="App" component={AppNav}/>
                <Stack.Screen name="Auth" component={AuthNav}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};

/*
const AuthNav = createStackNavigator({
        CheckUserExistsScreen: {
            screen: CheckUserExistsScreen
        },
        LoginScreen: {
            screen: LoginScreen
        },
        SignUpScreen: {
            screen: SignUpScreen
        },
        ForgotPasswordScreen: {
            screen: ForgotPasswordScreen
        }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        initialRouteName: 'LoginScreen',
    });

const RootNavigation = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppNav,
    Auth: AuthNav
}, {
    initialRouteName: 'AuthLoading'
});
const RootContainer = createAppContainer(RootNavigation);
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: material.brandInfo
    }
});