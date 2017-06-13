import userApi from '../api/userApi';
import * as type from '../constants/actionTypes';

export function loadUsersSuccess(users){
    return {
        type: type.LOAD_USERS,
        users
    };
}

export function loadUserSuccess(user){
    return {
        type: type.GET_USER,
        user
    };
}

export function loadUsers(){
    return dispatch => userApi.getAllUsers().then(users => dispatch(loadUsersSuccess(users)));
}

export function getUserById(id){
    return function(dispatch){
        return userApi.getUserById(id).then(user => dispatch(loadUserSuccess(user)));
    };
}