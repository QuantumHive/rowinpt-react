import axios from 'axios';
import api from './api';

const scheduleApi = api + '/schedules';
const cookies = { withCredentials: true };

class AgendaApi {
    static loadAgenda() {
        return axios.get(scheduleApi, cookies)
        .then(response => response.data);
    }

    // static addAgenda(date, timetableId) {
    //     return new Promise(resolve => {
    //         const agenda = {
    //             id: id,
    //             date: date.format("D-M-Y"),
    //             timetableId
    //         };

    //         db.agenda.push(agenda);

    //         id++;
                     
    //         resolve(agenda);
    //     });
    // }

    // static deleteAgenda(id) {
    //     return new Promise(resolve => {
    //         const index = _.findIndex(db.agenda, {id: id});
    //         db.agenda.splice(index, 1);
    //         resolve(id);
    //     });
    // }
}

export default AgendaApi;