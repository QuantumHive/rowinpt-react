import db from './db';

class CacheApi {
    static refreshCache(){
        return new Promise(resolve =>{
            resolve({
                locations: db.locations,
                coursetypes: db.coursetypes
            });
        });
    }
}

export default CacheApi;