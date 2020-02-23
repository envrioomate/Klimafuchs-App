import React, {Component, Fragment} from "react";
import {Button, CardItem, Icon, Text} from "native-base";
import * as WebBrowser from "expo-web-browser";
import material from "../../../native-base-theme/variables/material";

export const ExternalLinkButton = ({url}) => {
    return (
        <Button onPress={async () => {
            let result = await WebBrowser.openBrowserAsync(url);
        }}>
            <Text>{getHostName(url)}</Text>
            <Icon name='md-open' style={{color: material.brandLight}}/>
        </Button>
    )
};

const getHostName = (url) => {
    let hostName ;

    if (url.indexOf("//") > -1) {
        hostName = url.split('/')[2];
    }
    else {
        hostName = url.split('/')[0];
    }

    //find & remove port number
    hostName = hostName.split(':')[0];
    //find & remove "?"
    hostName = hostName.split('?')[0];

    return hostName;
}