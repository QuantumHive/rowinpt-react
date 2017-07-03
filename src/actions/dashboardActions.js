import agendaApi from '../api/agendaApi';
import {LOAD_DASHBOARD_SUCCESS, START_LOAD_DASHBOARD} from '../constants/actionTypes';

export function startLoadAgendaRequest(){
    return {
        type: START_LOAD_DASHBOARD
    };
}

export function loadAgendaSuccess(agenda){
    return {
        type: LOAD_DASHBOARD_SUCCESS,
        agenda
    };
}

export function loadAgenda(){
    return function(dispatch){
        dispatch(startLoadAgendaRequest());

        return agendaApi.loadAgenda().then(function(agenda){
            dispatch(loadAgendaSuccess(agenda));
        });
    };
}