import React, {Component, Fragment} from 'react';
import {AsyncStorage, KeyboardAvoidingView, StyleSheet, ScrollView, Keyboard} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Left,
    Right,
    Title,
    Card,
    CardItem,
    Text,
    Input
} from "native-base";
import Api from "../../network/api";
import material from '../../../native-base-theme/variables/material';
import {ValidatingTextField} from "../Common/ValidatingTextInput";
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";
import Constants from 'expo-constants'

class SignUpScreen extends Component {
    state = {
        userName: '',
        screenName: '',
        password: '',
        password2: '',
        gdprAccept: false,
        newsLetterAccept: false,
        invite: '',

        screenNameError: '',
        userNameError: '',
        passwordError: '',
    };


    checkPasswords = () => {
        let {password, password2} = this.state;
        if (password !== password2) {
            this.setState({passwordError: L.get("error_password_repeat_not_matching")})
        }
    };

    register = async () => {
        this.checkPasswords();
        if (!!(this.state.screenNameError || this.state.userNameError || this.state.passwordError)) return;
        let {screenName, userName, password, password2, gdprAccept, newsLetterAccept, invite} = this.state;
        Api.register({
                screenname: screenName,
                username: userName,
                password: password,
                confirm_password: password2,
                invite: invite
            },
            async (res) => {
                console.log(res.data);
                if (res.status === 200) {
                    Api.login(this.state.userName,
                        this.state.password,
                        async (res) => {
                            console.log(res.data);
                            if (res.status === 200) {
                                await AsyncStorage.setItem('uId', res.data.id.toString());
                                await AsyncStorage.setItem('token', res.data.token);
                                this.props.navigation.navigate('App');
                            }
                        },
                        (err) => {
                            //TODO show the error to the user, don't swallow it
                            console.log(err);
                        });
                }
            },
            (err) => {
                console.log(err);
            });

    };

    _checkUserExistsAsync = async (email) => {
        Api.checkEmailExists(email,
            (res) => {
            },
            (err) => {
            });
    };

    render() {
        return (
            <Fragment>
                <Header style={{paddingTop: Constants.statusBarHeight}}>
                    <Left>
                        <Button transparent
                                onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{L.get("signupscreen_title")}</Title>
                    </Body>
                    <Right/>
                </Header>
                <Container>
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={100}
                        style={{flex:1 }}
                        behavior="padding"
                        keyboardDismissMode="interactive"
                        keyboardShouldPersistTaps="always"
                        getTextInputRefs={() => { return [this.emailInput,this.screenNameInput, this.passwordInput, this.password2Input];}}
                    >
                    <ScrollView ref={(ref) => this.scrollView = ref}>
                    <Form style={styles.form}>

                                <ValidatingTextField
                                    name='userName'
                                    validateAs='userName'
                                    label={L.get("email_placeholder")}
                                    onChangeText={(text) => this.setState({userName: text})}
                                    value={this.state.userName}
                                    externalError={this.state.userNameError}
                                    ref={(ref) => this.emailInput = ref}
                                    onBlur={(error) => {
                                        this.setState({userNameError: error});
                                    }}
                                    onSubmitEditing={ () => {
                                        this.screenNameInput.focusInput();
                                        this.scrollView.scrollTo({y:100, animated: true})
                                    }}
                                    blurOnSubmit={false}

                                />

                                <ValidatingTextField
                                    name='screenName'
                                    validateAs='screenName'
                                    label={L.get("screenname_placeholder")}
                                    onChangeText={(text) => this.setState({screenName: text})}
                                    value={this.state.screenName}
                                    externalError={this.state.screenNameError}
                                    ref={(ref) => this.screenNameInput = ref}
                                    onBlur={(error) => {
                                        this.setState({screeNameError: error});
                                    }}
                                    onSubmitEditing={ () => {
                                        this.passwordInput.focusInput();
                                        this.scrollView.scrollTo({y:200, animated: true})
                                    }}
                                    blurOnSubmit={false}

                                />

                                <ValidatingTextField
                                    name='password'
                                    validateAs='password'
                                    label={L.get("password_placeholder")}
                                    secureTextEntry
                                    onChangeText={(text) => this.setState({password: text})}
                                    value={this.state.password}
                                    externalError={this.state.passwordError}
                                    ref={(ref) => this.passwordInput = ref}
                                    onBlur={(error) => {
                                        this.setState({passwordError: error});
                                    }}
                                    onSubmitEditing={ () => {
                                        this.password2Input.focusInput();
                                        this.scrollView.scrollTo({y:300, animated: true})
                                    }}

                                    blurOnSubmit={false}
                                />

                                <ValidatingTextField
                                    name='password2'
                                    validateAs='password2'
                                    label={L.get("password_repeat")}
                                    secureTextEntry
                                    onChangeText={(text) => this.setState({password2: text})}
                                    value={this.state.password2}
                                    externalError={this.state.passwordError}
                                    ref={(ref) => this.password2Input = ref}
                                    onBlur={(error) => {
                                        this.checkPasswords();
                                    }}

                                />

                                <Card>
                                    <CardItem>
                                        <Left>
                                             <CheckBox value={this.state.gdprAccept}
                                                       onValueChange={() => this.setState({ gdprAccept: !this.state.gdprAccept })}
                                             />
                                        </Left>
                                        <Body style={{flex:4}}>
                                            <Text
                                                  onPress={() => {
                                                      console.log(`${this.constructor.name}: privacy clicked!`);
                                                      this.props.navigation.navigate("PrivacyPolicyScreen");
                                                  }}>
                                                Ich habe die <Text style={{color: "blue", textDecorationLine: 'underline', fontWeight: 'bold'}}>Datenschutzerklärung</Text> gelesen und stimme ihr zu
                                            </Text>
                                        </Body>

                                    </CardItem>
                                </Card>

                                <Button
                                    disabled={!!(this.state.screenNameError || this.state.userNameError || this.state.passwordError || !this.state.gdprAccept)}
                                    full primary rounded style={{paddingBottom: 4, marginTop: 20,}}
                                        onPress={() => this.register()}>
                                    <Icon name="md-arrow-round-forward"/>
                                </Button>

                        </Form>
                    </ScrollView>

                    </KeyboardAvoidingView>
                </Container>
            </Fragment>

        );
    };
}

const styles = StyleSheet.create(
    {
        form: {
            flex: 1,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 40,
            marginBottom: 40
        },

        formLabel: {
            color: material.textColor,
            fontSize: 12,
            marginBottom: 5
        },

        formTextbox: {
            color: material.textColor,
            borderColor: material.textColor,
            marginBottom: 20
        }
    }
)

export default SignUpScreen;

/*

 <FormItem onPress={() => this.setState({gdprAccept: !this.state.gdprAccept})}>
                            <CheckBox checked={this.state.gdprAccept}>
                            </CheckBox>
                            <Text> Datenschutz? </Text>
                        </FormItem>
                        <FormItem onPress={() => this.setState({newsLetterAccept: !this.state.newsLetterAccept})}>
                            <CheckBox checked={this.state.newsLetterAccept}>
                            </CheckBox>
                            <Text> Newsletter? </Text>
                        </FormItem>

 */