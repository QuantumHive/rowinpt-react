import * as type from '../constants/actionTypes';
import _ from 'lodash';

export default function dashboardReducer(state = [], action) {
    switch (action.type) {
        case type.LOAD_DASHBOARD:
            return action.agenda;
        case type.ADD_SCHEDULE:
            return [
                ...state,
                {
                    id: action.schedule.id,
                    timetableId: action.schedule.timetableId,
                    date: action.schedule.date
                }
            ];
        case type.DELETE_SCHEDULE:
            {
                const index = _.findIndex(state, { id: Number(action.scheduleId) });
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            }
        default:
            return state;
    }
}