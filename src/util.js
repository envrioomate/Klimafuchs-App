import {dev, prod} from '../env';
import {Image} from "react-native";
import React from "react";
export const Env = __DEV__ ? dev : prod;

export class Util {
    static AvatarToUri(image, isTeam) {

        if (image) {
            if (image.filename) {
                return `${Env.API_IMG_URL}${image.filename}`
            }
        }
        console.log(
            `${Env.API_IMG_URL}avatar_default_alpha.png`
        )
        return `${Env.API_IMG_URL}${isTeam ? "avatar_default_team_alpha.png" : "avatar_default_alpha.png"}`
    }

    static CompletionLevelToNumber(level) {
        level = level.toLowerCase();
        switch (level) {
            case "max": return 3;
            case "good": return 2;
            case "med": return 1;
            case "min": return 0;
            default: return 0;
        }
    }
}
