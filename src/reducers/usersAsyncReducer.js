import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from '../constants/actionTypes';

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
        default:
            return state;
    }
}