import { LOGIN_SUCCESS, ACTIVATE_SUCCESS } from '../constants/actionTypes';
import accountApi from '../api/accountApi';

export function loginSuccess(user){
    return {
        type: LOGIN_SUCCESS,
        user
    };
}

export function login(email, password){
    return function(dispatch){
        return accountApi.signin(email, password).then(user => {
            dispatch(loginSuccess(user));
        });
    };
}

export function activateSuccess(){
    return {
        type: ACTIVATE_SUCCESS,
    };
}

export function refresh(){
    return function(dispatch){
        return accountApi.refresh().then(user => {
            dispatch(loginSuccess(user));
        });
    };
}

export function activateAccount(info){
    return function(dispatch){
        return accountApi.confirm(info).then(() => {
            dispatch(activateSuccess());
        });
    };
}