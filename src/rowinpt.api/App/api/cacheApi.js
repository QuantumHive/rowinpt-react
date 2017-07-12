import axios from 'axios';
import api from './api';

const courseTypeApi = api + '/courseTypes';
const subscriptionApi = api + '/subscriptions';
const locationsApi = api + '/locations';
const coursesApi = api + '/courses';
const timetablesApi = api + '/timetables';

class CacheApi {
    static refreshCache(){
        let cache = {};

        return axios.get(courseTypeApi)
                    .then(response => cache.coursetypes = response.data)
                    .then(() => axios.get(subscriptionApi)
                                     .then(response => cache.subscriptions = response.data))
                    .then(() => axios.get(locationsApi)
                                     .then(response => cache.locations = response.data))
                    .then(() => axios.get(coursesApi)
                                     .then(response => cache.courses = response.data))
                    .then(() => axios.get(timetablesApi)
                                     .then(response => cache.timetable = response.data))                                     
                    .then(() => cache);
    }
}

export default CacheApi;