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