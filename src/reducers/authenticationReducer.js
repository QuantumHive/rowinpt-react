import { LOGIN_SUCCESS } from '../constants/actionTypes';

export default function authenticationReducer(state = {isAuthenticated: false}, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return {isAuthenticated: true, user: action.user};
        default:
            return state;
    }
}