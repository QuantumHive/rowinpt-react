import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, ADD_USER_SUCCESS, EDIT_USER_SUCCESS } from '../constants/actionTypes';
import _ from 'lodash';

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
        case EDIT_USER_SUCCESS: {
            const updatedUsers = [...state.items];
            const index = _.findIndex(updatedUsers, { id: action.user.id });
            updatedUsers[index] = action.user;
            return {
                items: updatedUsers,
                isFetching: false
            };
        }
        default:
            return state;
    }
}