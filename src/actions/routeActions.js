import * as type from '../constants/navigationTypes';

export function setCommandBar(routePath){
    return {
        type: type.SET_COMMAND,
        routePath
    }
}