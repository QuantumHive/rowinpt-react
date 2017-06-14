import * as type from '../constants/actionTypes';

export function setCommandBar(routePath){
    return {
        type: type.SET_COMMAND,
        routePath
    }
}