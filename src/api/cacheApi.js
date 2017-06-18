import db from './db';

class CacheApi {
    static refreshCache(){
        return new Promise(resolve =>{
            resolve({
                locations: db.locations,
                coursetypes: db.coursetypes,
                courses: db.courses,
                timetable: db.timetable
            });
        });
    }
}

export default CacheApi;