import * as type from "../constants/actionTypes";
import _ from "lodash";

export default function dashboardReducer(state = { items: [], isLoading: false }, action) {
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
        case type.DELETE_SCHEDULE:
            {
                const index = _.findIndex(state.items, { id: Number(action.scheduleId) });
                return {
                    items: [
                        ...state.items.slice(0, index),
                        ...state.items.slice(index + 1)
                    ],
                    isLoading: false
                };
            }
        default:
            return state;
    }
}