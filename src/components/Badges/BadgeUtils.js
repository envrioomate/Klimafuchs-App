import material from "../../../native-base-theme/variables/material";


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