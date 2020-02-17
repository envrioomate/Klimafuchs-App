import gql from 'graphql-tag'

export const CURRENT_BADGES = gql`
    query currentBadges {
        currentChallenges {
            id,
            plan {
                thema {
                    title,
                    headerImage {
                        url
                    },
                    text,

                },
                position
            },
            challenge {
                name,
                title,
                text,
                quantityName,
                headerImage {
                    url
                },
                icon {
                    url
                },
                badgeGoals {
                    badgeGoalType,
                    minCompletion,
                    minQuantity,
                    medCompletion,
                    medQuantity,
                    goodCompletion,
                    goodQuantity,
                    maxCompletion,
                    maxQuantity
                },
                achievements {
                    name,
                    title,
                    text,
                    recurring,
                    score
                }
                externalLink
            },
            replaceable,
            challengeCompletion {
                id,
                challengeGoalCompletionLevel,
                challengeCompletionQuantity
            },
        }
    }
`;

export const CURRENT_SEASON = gql`
    query currentSeason {
        currentSeason {
            id,
            startDate,
            startOffsetDate,
            endDate,
            title
        }
    }
`;

export const SEASONS = gql`
    query seasons {
        seasons {
            id,
            startDate,
            endDate,
            seasonPlan {
                id,
                duration,
                thema {
                    title
                }
            }
        }
    }
`

export const CURRENT_SEASONPLAN = gql`
    query globalCurrentChallenges {
        globalCurrentChallenges {
            thema {
                name
                title
                text
                headerImage {url}
                createdAt
                updatedAt
            }
        }
    }
`;

export const COMPLETE_CHALLENGE = gql`
    mutation completeChallenge($challengeId: Int!, $challengeGoalCompletionLevel: Int, $challengeCompletionQuantity: Float) {
        completeChallenge(challengeId:$challengeId, challengeGoalCompletionLevel:$challengeGoalCompletionLevel, challengeCompletionQuantity:$challengeCompletionQuantity) {
            id,
            challengeGoalCompletionLevel,
            challengeCompletionQuantity
        }
    }
`;

export const UNCOMPLETE_CHALLENGE = gql`
    mutation uncompleteChallenge($challengeCompletionId: Int!) {
        uncompleteChallenge(challengeCompletionId:$challengeCompletionId) {
            createdAt
        }
    }
`;

export const SELECT_ACHIEVEMENT = gql`
    mutation selectAchievement($achievementName: String!) {
    selectAchievement(achievementName:$achievementName) {
        id

    }
    }
`;


export const COMPLETE_ACHIEVEMENT = gql`
    mutation completeAchievement($achievementSelectionId: Int!) {
        completeAchievement(achievementSelectionId: $achievementSelectionId) {
            id

        }
    }
`;


