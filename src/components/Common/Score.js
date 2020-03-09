import React, {Component} from 'react';
import {StyleSheet, Image, View} from 'react-native';

export const Score = ({pt, style}) => {
    let width = pt * 1.33 || 24;
    let height = pt * 1.33 || 24;
    return (
        <Image
            resizeMode="contain"
            source={require('../../../assets/score.png')}
            fadeDuration={0}
            style={{
                height: height,
                width: width,
            }}

        />
    )
};