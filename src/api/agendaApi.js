import db from './db';

class AgendaApi {
    static loadAgenda() {
        return new Promise(resolve => {
            resolve(db.agenda);
        });
    }

    static addAgenda(date, timetableId) {
        return new Promise(resolve => {
            const agenda = {
                date: date.format("D-M-Y"),
                timetableId
            };

            db.agenda.push(agenda);
            
            resolve(agenda);
        });
    }
}

export default AgendaApi;