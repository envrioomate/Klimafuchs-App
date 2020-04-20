import React from 'react';
import {Body, Button, Container, Content, Footer, FooterTab, Header, Left, Right, Text, Title} from 'native-base';
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";

export function ServerMaintenanceScreen({retryConnection}) {

    return (
        <Container>
            <Header>
                <Left/>
                <Body>
                    <Title>{L.get("server_down_title")}</Title>
                </Body>
                <Right/>
            </Header>
            <Content>
                <Text>
                    {L.get("server_down_description")}
                </Text>
            </Content>
            <Footer>
                <FooterTab>
                    <Button full onpress={() => {
                        retryConnection()
                    }}>
                        <Text>{L.get("server_down_retry")}</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}