import * as type from '../constants/actionTypes';

export default function userReducer(state = [], action) {
    switch (action.type) {
        case type.LOAD_USERS:
            return action.users;
        case type.NEW_USER:
            return state.map(s => Object.assign({}, s)).concat([Object.assign({}, action.user)]);
        default:
            return state;
    }
}