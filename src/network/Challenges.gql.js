import gql from 'graphql-tag'

export const CURRENT_CHALLENGES = gql`
    query currentChallenges {
        currentChallenges {
            id,
            plan {
                themenwoche {
                    title,
                    headerImage {
                        url
                    },
                    content,
                    
                },
                position
            },
            challenge {
                id,
                title,
                content,
                headerImage {
                    url
                },
                challengeGoals {
                    challengeGoalType,
                    minCompletion,
                    minQuantity,
                    medCompletion,
                    medQuantity,
                    goodCompletion,
                    goodQuantity,
                    maxCompletion,
                    maxQuantity
                }
            },
            replaceable,
            challengeCompletion {
                id,
                challengeGoalCompletionLevel,
                challengeCompletionQuantity
            }
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
                themenwoche {
                    title
                }
            }
        }
    }
`

export const CURRENT_SEASONPLAN = gql`
    query globalCurrentChallenges {
        globalCurrentChallenges {
            themenwoche {
                
                title
                content
                headerImage {url}
                createdAt
                updatedAt
                kategorie {name}
            }
        }
    }
`;

export const COMPLETE_CHALLENGE = gql`
    mutation completeChallenge($challengeId: Int!, $challengeGoalCompletionLevel: Int, $challengeCompletionQuantity: Float) {
        completeChallenge(challengeId:$challengeId, challengeGoalCompletionLevel:$challengeGoalCompletionLevel, challengeCompletionQuantity:$challengeCompletionQuantity) {
            id
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


export const REJECT_CHALLENGE = gql`
    mutation rejectChallenge($challengeId: Int!) {
        rejectChallenge(challengeId:$challengeId) {
            id
        }
    }
`;

