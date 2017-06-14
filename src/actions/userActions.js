import userApi from '../api/userApi';
import * as type from '../constants/actionTypes';

export function loadUsersSuccess(users){
    return {
        type: type.LOAD_USERS,
        users
    };
}

export function loadUsers(){
    return dispatch => userApi.getAllUsers().then(users => dispatch(loadUsersSuccess(users)));
}