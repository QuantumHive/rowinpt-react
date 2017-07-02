import { LOGIN_SUCCESS } from '../constants/actionTypes';
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

export function refresh(){
    return function(dispatch){
        return accountApi.refresh().then(user => {
            dispatch(loginSuccess(user));
        });
    };
}