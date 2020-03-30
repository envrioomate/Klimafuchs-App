import material from "../../../native-base-theme/variables/material";
import {Image, StyleSheet, View} from "react-native";
import {LocalizationProvider as L} from "../../localization/LocalizationProvider";
import React from "react";


// TODO export a more complete style?
export const completionLevelToColor = (completion) => {
    if (!completion) return material.completionNone;
    let level = completion.challengeGoalCompletionLevel;
    switch (level) {
        case("MIN"):
            return material.completionMin;
        case("MED"):
            return material.completionMed;
        case("GOOD"):
            return material.completionGood;
        case("MAX"):
            return material.completionMax;
        default:
            return material.completionNone;
    }
};

export const completionLevelToFriendlyString = (completion) => {
    if (!completion) return L.get("badge_not_completed");
    let level = completion.challengeGoalCompletionLevel;
    switch (level) {
        case("MIN"):
            return L.get("badge_min_completed");
        case("MED"):
            return L.get("badge_med_completed");
        case("GOOD"):
            return L.get("badge_good_completed");
        case("MAX"):
            return L.get("badge_max_completed");
        default:
            return L.get("badge_not_completed");
    }
};

export const completionLevelToAbbreviatedString = (completion) => {
    if (!completion) return L.get("badge_not_completed");
    let level = completion.challengeGoalCompletionLevel;
    switch (level) {
        case("MIN"):
            return "teilgenommen";
        case("MED"):
            return "Orange (guter Anfang)";
        case("GOOD"):
            return "gelb (gut)";
        case("MAX"):
            return "grün (ausgezeichnet) ";
        default:
            return L.get("badge_not_completed");
    }
};



export const badgeScreenStyles = StyleSheet.create({
    checkmark: {
        padding: 10,
        borderRadius: 5
    },
    iconPreview: {
        width: 44,
        height: 44,
        padding: 20,
    },
});
export const BadgeIcon = ({badgeIcon, bgColor}) => {
    return (
        <View style={{
            width: 52,
            height: 52,
            borderRadius: 4,
            borderColor: bgColor,
            borderWidth: 3,
            overflow: "hidden",
            backgroundColor: bgColor
        }}>
            <Image style={{backgroundColor: bgColor, ...badgeScreenStyles.iconPreview}}
                   source={badgeIcon ? {uri: badgeIcon.url + '?date=' + (new Date()).getHours()} : require('../../../assets/image_select.png')}
                   resizeMode="contain"
            />
        </View>
    )
};