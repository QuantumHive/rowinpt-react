import axios from 'axios';
import api from './api';

import db from './db';

const courseTypeApi = api + '/courseTypes';
const subscriptionApi = api + '/subscriptions';

class CacheApi {
    static refreshCache(){
        let cache = {
                locations: db.locations,
                courses: db.courses,
                timetable: db.timetable,
            };

        return axios.get(courseTypeApi)
                    .then(response => cache.courseTypes = response.data)
                    .then(() => axios.get(subscriptionApi)
                                     .then(response => cache.subscriptions = response.data))
                    .then(() => cache);
    }
}

export default CacheApi;