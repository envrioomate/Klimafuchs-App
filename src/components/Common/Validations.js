import {Env} from '../../util.js'
export const constraints = {
    teamName: {
        presence: {
            allowEmpty: false,
            message: '^Bitte gib deinem Team einen Namen'
        },
    },
    userName: {
        email: {
            message: '^Bitte gib eine Email ein'
        }
    },
    screenName: {
        presence: {
            allowEmpty: false,
            message: '^Bitte gib einen Namen ein'
        },
    },
    password: {
        length: {
            minimum: Env.MIN_PASSWORD_LEN,
            message: `Bitte gib ein mindestens ${Env.MIN_PASSWORD_LEN} Zeichen langes Passwort ein`
        },
    },

};