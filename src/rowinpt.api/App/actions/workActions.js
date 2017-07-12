import agendaApi from '../api/agendaApi';
import {LOAD_WORK_SUCCESS, START_LOAD_WORK} from '../constants/actionTypes';

export function startLoadWorkRequest(){
    return {
        type: START_LOAD_WORK
    };
}

export function loadWorkSuccess(work){
    return {
        type: LOAD_WORK_SUCCESS,
        work
    };
}

export function loadWork(){
    return function(dispatch){
        dispatch(startLoadWorkRequest());
        return agendaApi.loadWork().then(function(response){
            dispatch(loadWorkSuccess(response.data));
        });
    };
}