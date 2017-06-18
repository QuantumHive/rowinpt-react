import cacheApi from '../api/cacheApi';
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

export function loadCacheSuccess(cache){
    return {
        type: type.REFRESH_CACHE,
        cache
    };
}

export function loadCache(){
    return dispatch => cacheApi.refreshCache().then(cache => dispatch(loadCacheSuccess(cache)));
}