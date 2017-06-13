import * as type from '../constants/userTypes';

export default function userReducer(state = [], action) {
    switch (action.type) {
        case type.LOAD_USERS:
            return action.users;
        default:
            return state;
    }
}