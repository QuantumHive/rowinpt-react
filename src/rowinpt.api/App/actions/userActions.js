import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    ADD_USER_SUCCESS,
    EDIT_USER_SUCCESS
 } from '../constants/actionTypes';
import userApi from '../api/userApi';

export function startFetchUsersRequest(){
    return {
        type: FETCH_USERS_REQUEST,
    };
}

export function fetchUsersSuccess(users){
    return {
        type: FETCH_USERS_SUCCESS,
        users
    };
}

export function addUserSuccess(user){
    return {
        type: ADD_USER_SUCCESS,
        user
    };
}

export function editUserSuccess(user){
    return {
        type: EDIT_USER_SUCCESS,
        user
    };
}

export function fetchUsers(){
    return function(dispatch){
        dispatch(startFetchUsersRequest());

        return userApi.get().then(users => {
            dispatch(fetchUsersSuccess(users));
        });
    };
}

export function addUser(user){
    return function(dispatch){
        return userApi.add(user).then(user => {
            dispatch(addUserSuccess(user));
        });
    };
}

export function editUser(user){
    return function (dispatch) {
        dispatch(startFetchUsersRequest());
        return userApi.edit(user).then(() => {
            dispatch(editUserSuccess(user));
        });
    };
}