import * as type from '../constants/actionTypes';
import _ from 'lodash';

export default function dashboardReducer(state = {items:[], isLoading: false}, action) {
    switch (action.type) {
        case type.START_LOAD_DASHBOARD:
            return {
                items: [...state.items],
                isLoading: true
            };
        case type.LOAD_DASHBOARD_SUCCESS:
            return {
                items: [...action.agenda],
                isLoading: false
            };
        case type.ADD_SCHEDULE: {
            return {
                items: [...state.items, action.schedule],
                isLoading: false
            };
        }
        // case type.DELETE_SCHEDULE:
        //     {
        //         const index = _.findIndex(state, { id: Number(action.scheduleId) });
        //         return [
        //             ...state.slice(0, index),
        //             ...state.slice(index + 1)
        //         ];
        //     }
        default:
            return state;
    }
}