import * as type from '../constants/actionTypes';

export default function scheduleReducer(state = {}, action) {
    switch (action.type) {
        case type.SCHEDULE_SET_LOCATION:
            return { ...state, location: action.location };
        default:
            return state;
    }
}