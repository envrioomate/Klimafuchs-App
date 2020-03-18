import {handleActions} from 'redux-actions'
import {actions} from '../actions/Actions'

export default handleActions({
    [actions.user.setteam]: (state, action) => {
        console.log(state, action);
        return ({
            teamId: action.teamId
        })
    },
}, {
    teamId: -1
});