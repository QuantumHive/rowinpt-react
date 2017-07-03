import axios from 'axios';
import api from './api';

const scheduleApi = api + '/schedules';
const cookies = { withCredentials: true };

class AgendaApi {
    static loadAgenda() {
        return axios.get(scheduleApi, cookies)
        .then(response => response.data);
    }

    static addAgenda(agenda) {
        return axios.post(scheduleApi, agenda, cookies)
            .then(response => response.data);
    }

    // static deleteAgenda(id) {
    //     return new Promise(resolve => {
    //         const index = _.findIndex(db.agenda, {id: id});
    //         db.agenda.splice(index, 1);
    //         resolve(id);
    //     });
    // }
}

export default AgendaApi;