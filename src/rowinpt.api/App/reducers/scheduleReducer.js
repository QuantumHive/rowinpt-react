import * as type from '../constants/actionTypes';

export default function scheduleReducer(state = { redirect: ""}, action) {
    switch (action.type) {
        case type.SCHEDULE_SET_LOCATION:
            return { ...state, location: action.location };
        case type.SCHEDULE_SET_TYPE:
            return { ...state, courseType: action.courseType };
        case type.SCHEDULE_SET_DATE:
            return { ...state, date: action.date };
        case type.SCHEDULE_SET_COURSE:
            return { ...state, course: action.course };
        case type.SCHEDULE_REDIRECT:
            return { redirect: action.redirect };
        case type.SCHEDULE_RESET_REDIRECT:
            return { redirect: "" };
        default:
            return state;
    }
}