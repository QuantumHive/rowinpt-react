import * as type from '../constants/actionTypes';

export function setLocation(location){
    return {
        type: type.SCHEDULE_SET_LOCATION,
        location
    };
}