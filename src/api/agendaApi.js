import db from './db';

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
}

export default AgendaApi;