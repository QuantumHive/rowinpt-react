import * as type from '../constants/actionTypes';

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
        default:
            return state;
    }
}