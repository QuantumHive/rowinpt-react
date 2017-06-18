import agendaApi from '../api/agendaApi';
import * as type from '../constants/actionTypes';

export function loadAgendaSuccess(agenda){
    return {
        type: type.LOAD_DASHBOARD,
        agenda
    };
}

export function loadAgenda(){
    return dispatch => agendaApi.loadAgenda().then(agenda => dispatch(loadAgendaSuccess(agenda)));
}