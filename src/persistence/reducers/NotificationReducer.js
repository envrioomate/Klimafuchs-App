import {handleActions} from 'redux-actions'
import {actions} from '../actions/Actions'

const defaultState = {
    notifications: []
};

export default handleActions({
    [actions.notifications.receive]: (state, action) => {
        console.log(state, action);
        if(state.notifications.filter(value => value.notificationId === action.notification.notificationId).length > 0)
            return state;
        return ({
            notifications: [action.notification, ...state.notifications]
        })
    },
    [actions.notifications.delete]: (state, action) => {
        console.log(state, action);
        return ({
            notifications: state.notifications.filter(notification => notification.notificationId !== action.notificationId)
        })
    },
    [actions.notifications.deleteall]: (state, action) => {
        console.log(state, action);
        return ({
            notifications: []
        })
    },

}, {
    notifications: []
});