import * as type from '../constants/actionTypes';

export default function dashboardReducer(state = [], action) {
    switch(action.type){
        case type.LOAD_DASHBOARD:
            return action.agenda;
        default:
            return state;
    }
}