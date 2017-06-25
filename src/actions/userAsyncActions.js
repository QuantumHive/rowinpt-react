import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from '../constants/actionTypes';
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

export function fetchUsers(){
    return function(dispatch){
        dispatch(startFetchUsersRequest());

        return userApi.get().then(users => {
            dispatch(fetchUsersSuccess(users));
        });
    };
}