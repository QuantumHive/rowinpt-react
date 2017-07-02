import { LOGIN_SUCCESS, ACTIVATE_SUCCESS } from '../constants/actionTypes';

export default function authenticationReducer(state = { isAuthenticated: false, isConfirmed: false }, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { isAuthenticated: true, user: action.user };
        case ACTIVATE_SUCCESS:
            return { isConfirmed: true };
        default:
            return state;
    }
}