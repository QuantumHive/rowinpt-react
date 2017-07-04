import { LOGIN_SUCCESS, ACTIVATE_SUCCESS, AWAIT_AUTHENTICATION, CANCEL_AWAIT_AUTHENTICATION, LOGOUT_SUCCESS } from '../constants/actionTypes';

export default function authenticationReducer(state = { isAuthenticated: false, isConfirmed: false, await: true, logout: false }, action) {
    switch (action.type) {
        case CANCEL_AWAIT_AUTHENTICATION:
            return {...state, await: false};
        case AWAIT_AUTHENTICATION:
            return {...state, await: true};
        case LOGIN_SUCCESS:
            return {...state, isAuthenticated: true, user: action.user, await:false, logout: false };
        case ACTIVATE_SUCCESS:
            return {...state, isConfirmed: true, };
        case LOGOUT_SUCCESS:{
            return { isAuthenticated: false, isConfirmed: false, await: false, logout: true };}
        default:
            return state;
    }
}