import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, View} from 'react-native';
import {NavigationContainer, useLinking} from "@react-navigation/native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {Root, Spinner, StyleProvider} from 'native-base';
import LoginScreen from "./src/components/PreLogin/LoginScreen";
import SignUpScreen from "./src/components/PreLogin/SignUpScreen";
import {Provider as ReduxProvider} from "react-redux";
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import {persistor, store} from "./src/persistence/store"
import {PersistGate} from 'redux-persist/integration/react'
import * as Font from 'expo-font';
import {AppNav} from "./src/components/LoggedInScreen";
import {ForgotPasswordScreen} from "./src/components/PreLogin/ForgotPasswordScreen";
import {Notifications} from "expo";
import ApolloProvider from "react-apollo/ApolloProvider";
import client from "./src/network/client"
import Api from "./src/network/api";
import {SafeAreaProvider} from "react-native-safe-area-context";
import { Linking } from 'expo';
import {PersistentScoreHeader} from "./src/components/Common/PersistentScoreHeader";
import {PrivacyPolicyScreen} from "./src/components/PreLogin/PrivacyPolicyScreen";
import {HintPopUpProvider} from "./src/components/Common/HintPopUp";

const prefix = Linking.makeUrl('/');
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

        if (notification.origin === 'received') {
            console.log("received notification: " + JSON.stringify(notification))

        } else if (notification.origin === 'selected') {
            if(notification.data.path) Linking.openURL(prefix + notification.data.path)
        }
    };

    componentDidMount() {
        this._notificationSubscription = Notifications.addListener(this.handleNotification);
    }

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
       });
        await client.resetStore();
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
            <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen}/>

        </Stack.Navigator>
    )
};

const MyTheme = {
    dark: false,
    colors: {
        primary: material.brandLight,
        background: material.brandLight,
        card: material.brandInfo,
        text: material.brandLight,
        border: material.brandInfo,
    },
};

function RootContainer() {

    //see https://reactnavigation.org/docs/en/deep-linking.html

    const ref = React.useRef();


    const { getInitialState } = useLinking(ref, {
        prefixes: [prefix],
    });
    const [isReady, setIsReady] = React.useState(false);
    const [initialState, setInitialState] = React.useState();

    React.useEffect(() => {
        getInitialState()
            .catch(() => {})
            .then(state => {
                if (state !== undefined) {
                    setInitialState(state);
                }

                setIsReady(true);
            });
    }, [getInitialState]);

    if (!isReady) {
        return <Spinner/>
    }
    return (
        <NavigationContainer theme={MyTheme} initialState={initialState} ref={ref}>
            <Stack.Navigator initialRouteName="AuthLoading" headerMode="screen">
                <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="App" component={AppNav}
                              options={{
                                  header: ({ scene, previous, navigation }) => {
                                      const { options } = scene.descriptor;
                                      const title =
                                          options.headerTitle !== undefined
                                              ? options.headerTitle
                                              : options.title !== undefined
                                              ? options.title
                                              : scene.route.name;

                                      return (
                                          <PersistentScoreHeader options={options} navigation={navigation}/>
                                      );
                                  }
                                  ,headerStyle: {
                                      height: 80, // Specify the height of your custom header
                                  }
                              }}
                />
                <Stack.Screen name="Auth" component={AuthNav} options={{
                    headerShown: false
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

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