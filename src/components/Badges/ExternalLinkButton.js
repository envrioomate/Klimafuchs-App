import React, {Component, Fragment} from "react";
import {Button, CardItem, Icon, Text} from "native-base";
import * as WebBrowser from "expo-web-browser";
import material from "../../../native-base-theme/variables/material";

export const ExternalLinkButton = ({url}) => {
    return (
        <Button onPress={async () => {
            let result = await WebBrowser.openBrowserAsync(url);
        }}>
            <Text>{url}</Text>
            <Icon name='md-open' style={{color: material.brandLight}}/>
        </Button>
    )
};