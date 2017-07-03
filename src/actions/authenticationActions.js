import { LOGIN_SUCCESS, ACTIVATE_SUCCESS, AWAIT_AUTHENTICATION, CANCEL_AWAIT_AUTHENTICATION, LOGOUT_SUCCESS } from '../constants/actionTypes';
import accountApi from '../api/accountApi';

export function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        user
    };
}

export function activateSuccess() {
    return {
        type: ACTIVATE_SUCCESS,
    };
}

export function cancelRefresh() {
    return {
        type: CANCEL_AWAIT_AUTHENTICATION
    };
}

export function startRefresh() {
    return {
        type: AWAIT_AUTHENTICATION
    };
}

export function logoutSuccess(){
    return {
        type: LOGOUT_SUCCESS
    };
}

export function login(email, password) {
    return function (dispatch) {
        dispatch(startRefresh());

        return accountApi.signin(email, password).then(response => {
            if (response.status !== 200) {
                dispatch(cancelRefresh());
            } else {
                dispatch(loginSuccess(response.data));
            }
        });
    };
}

export function refresh() {
    return function (dispatch) {
        dispatch(startRefresh());

        return accountApi.refresh().then(response => {
            if (response.status !== 200) {
                dispatch(cancelRefresh());
            } else {
                dispatch(loginSuccess(response.data));
            }
        });
    };
}

export function activateAccount(info) {
    return function (dispatch) {
        return accountApi.confirm(info).then(() => {
            dispatch(activateSuccess());
        });
    };
}

export function logout(){
    return function(dispatch){
        return accountApi.signout().then(response => {
            if(response.status === 200){
                dispatch(logoutSuccess());
            }
        });
    };
}