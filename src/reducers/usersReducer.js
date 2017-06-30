import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, ADD_USER_SUCCESS } from '../constants/actionTypes';

export default function usersAsyncReducer(state = {items:[], isFetching: false}, action){
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                items: [...state.items],
                isFetching: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                items: [...action.users],
                isFetching: false
            };
        case ADD_USER_SUCCESS:
            return {
                items: [...state.items, action.user],
                isFetching: false
            };
        default:
            return state;
    }
}