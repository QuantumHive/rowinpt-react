import db from './db';

class AgendaApi {
    static loadAgenda(){
        return new Promise(resolve =>{
            resolve(db.agenda);
        });
    }
}

export default AgendaApi;