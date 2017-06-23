import * as type from '../constants/actionTypes';
import _ from 'lodash';

export default function userReducer(state = [], action) {
    switch (action.type) {
        case type.LOAD_USERS:
            return action.users;
        case type.NEW_USER:
            return state.map(s => Object.assign({}, s)).concat([Object.assign({}, action.user)]);
        case type.EDIT_USER:
            {
                const index = _.findIndex(state, { id: Number(action.user.id) });
                const removedState = [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];

                return removedState.map(s => Object.assign({}, s)).concat([Object.assign({}, action.user)])
            }
        default:
            return state;
    }
}