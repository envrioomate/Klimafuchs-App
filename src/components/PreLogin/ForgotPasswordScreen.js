import React, {Component} from 'react'
import {LinearGradient} from "expo-linear-gradient";
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Form,
    H1,
    Header,
    Icon,
    Input,
    Item,
    Left,
    Right,
    Text,
    Toast
} from "native-base";
import {View} from "react-native";
import {Grid, Row} from "react-native-easy-grid";
import {loginScreenStyles} from "./LoginScreen";
import Api from "../../network/api";
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";
import Constants from "expo-constants";

export class ForgotPasswordScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }

    resetPassword = () => {
        if (this.state.email === '') {
            Toast.show({
                text: err.response.data,
            });
            return;
        }
        Api.requestPasswordReset(this.state.email,
            (res) => {
                Toast.show({
                    text: L.get("toast_password_reset_success"),
                })
            },
            (err) => {
                Toast.show({
                    text: err.response.data,
                })
            });
    }

    render() {

        return (
            <Container style={{paddingTop: Constants.statusBarHeight}}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate('LoginScreen', {email: this.state.email});
                        }}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                    <View style={loginScreenStyles.container} contentContainerStyle={loginScreenStyles.row}>
                        <Grid style={{alignItems: 'flex-start'}}>

                            <Row size={2}>
                                <Card style={loginScreenStyles.loginCard}>
                                    <CardItem style={loginScreenStyles.loginCardItem}>
                                        <H1>{L.get("reset_password_title")}</H1>
                                    </CardItem>
                                    <CardItem style={loginScreenStyles.loginCardItem}>
                                        <Form style={{flex: 1}}>
                                            <Item regular style={loginScreenStyles.loginFormTextInput}>
                                                <Input name="email"
                                                       placeholder={L.get("email_placeholder")}
                                                       onChangeText={(text) => this.setState({email: text})}
                                                       value={this.state.email}/>
                                            </Item>

                                        </Form>
                                    </CardItem>
                                </Card>
                            </Row>
                            <Row size={1} style={loginScreenStyles.row}>
                                <Button primary style={loginScreenStyles.loginButton}
                                        onPress={() => this.resetPassword()}>
                                    <Text>{L.get("reset_password_action")}</Text>
                                </Button>
                            </Row>
                        </Grid>
                    </View>
            </Container>
        )
            ;
    }
}