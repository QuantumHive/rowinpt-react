import agendaApi from '../api/agendaApi';
import * as type from '../constants/actionTypes';

export function setLocation(location){
    return {
        type: type.SCHEDULE_SET_LOCATION,
        location
    };
}

export function setCourseType(courseType){
    return {
        type: type.SCHEDULE_SET_TYPE,
        courseType
    };
}

export function setDate(date){
    return {
        type: type.SCHEDULE_SET_DATE,
        date
    };
}

export function setCourse(course){
    return {
        type: type.SCHEDULE_SET_COURSE,
        course
    };
}

export function addScheduleSuccess(schedule){
    return {
        type: type.ADD_SCHEDULE,
        schedule
    };
}

export function addSchedule(date, timetableId) {
    return dispatch => {
        return agendaApi.addAgenda({date, timetableId}).then(schedule => dispatch(addScheduleSuccess(schedule)));
    };
}

export function deleteScheduleSuccess(scheduleId){
    return {
        type: type.DELETE_SCHEDULE,
        scheduleId
    };
}

export function deleteSchedule(id){
    return dispatch => {
        return agendaApi.deleteAgenda(id).then(scheduleId => dispatch(deleteScheduleSuccess(scheduleId)));
    };
}