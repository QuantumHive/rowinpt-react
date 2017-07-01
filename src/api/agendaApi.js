import _ from 'lodash';

const db = {
    agenda: []
};

let id = 1;

class AgendaApi {
    static loadAgenda() {
        return new Promise(resolve => {
            resolve(db.agenda);
        });
    }

    static addAgenda(date, timetableId) {
        return new Promise(resolve => {
            const agenda = {
                id: id,
                date: date.format("D-M-Y"),
                timetableId
            };

            db.agenda.push(agenda);

            id++;
                     
            resolve(agenda);
        });
    }

    static deleteAgenda(id) {
        return new Promise(resolve => {
            const index = _.findIndex(db.agenda, {id: id});
            db.agenda.splice(index, 1);
            resolve(id);
        });
    }
}

export default AgendaApi;