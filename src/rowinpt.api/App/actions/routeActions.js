import * as type from '../constants/actionTypes';

export function setPrimaryCommandBar(primary){
    return {
        type: type.SET_COMMAND_PRIMARY,
        primary
    };
}

export function setSecondaryCommandBar(leftCallback, rightCallback){
    return {
        type: type.SET_COMMAND_SECONDARY,
        leftCallback,
        rightCallback
    };
}