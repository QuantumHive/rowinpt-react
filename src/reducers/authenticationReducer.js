import { LOGIN_SUCCESS, ACTIVATE_SUCCESS, AWAIT_AUTHENTICATION, CANCEL_AWAIT_AUTHENTICATION, LOGOUT_SUCCESS } from '../constants/actionTypes';

export default function authenticationReducer(state = { isAuthenticated: false, isConfirmed: false, await: true }, action) {
    switch (action.type) {
        case CANCEL_AWAIT_AUTHENTICATION:
            return {...state, await: false};
        case AWAIT_AUTHENTICATION:
            return {...state, await: true};
        case LOGIN_SUCCESS:
            return {...state, isAuthenticated: true, user: action.user, await:false };
        case ACTIVATE_SUCCESS:
            return {...state, isConfirmed: true, };
        case LOGOUT_SUCCESS:{
            return { isAuthenticated: false, isConfirmed: false, await: false };}
        default:
            return state;
    }
}