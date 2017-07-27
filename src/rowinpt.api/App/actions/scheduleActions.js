import AgendaApi from "../api/agendaApi";
import * as Type from "../constants/actionTypes";
import * as Paths from "../constants/routePaths";

export function setLocation(location){
    return {
        type: Type.SCHEDULE_SET_LOCATION,
        location
    };
}

export function setCourseType(courseType){
    return {
        type: Type.SCHEDULE_SET_TYPE,
        courseType
    };
}

export function setDate(date){
    return {
        type: Type.SCHEDULE_SET_DATE,
        date
    };
}

export function setCourse(course){
    return {
        type: Type.SCHEDULE_SET_COURSE,
        course
    };
}

export function addSchedule(date, timetableId) {
    return dispatch => {
        return AgendaApi.addAgenda({ date: date.format("YYYY-MM-DD"), timetableId })
            .then(() => {
                dispatch(redirectTo(Paths.Agenda));
            });
    };
}

export function deleteScheduleSuccess(scheduleId){
    return {
        type: Type.DELETE_SCHEDULE,
        scheduleId
    };
}

export function deleteSchedule(id){
    return dispatch => {
        return AgendaApi.deleteAgenda(id).then(() => dispatch(redirectTo(Paths.Agenda)));
    };
}

export function redirectTo(redirect) {
    return {
        type: Type.SCHEDULE_REDIRECT,
        redirect
    };
}

export function resetRedirect() {
    return {
        type: Type.SCHEDULE_RESET_REDIRECT
    };
}