import userApi from '../api/userApi';
import * as type from '../constants/actionTypes';

export function loadUsersSuccess(users) {
    return {
        type: type.LOAD_USERS,
        users
    };
}

export function loadUsers() {
    return dispatch => userApi.getAllUsers().then(users => dispatch(loadUsersSuccess(users)));
}

export function addUserSuccess(user) {
    return {
        type: type.NEW_USER,
        user
    };
}

export function addUser(user) {
    return dispatch => {
        return userApi.addUser(user).then(user => dispatch(addUserSuccess(user)));
    };
}