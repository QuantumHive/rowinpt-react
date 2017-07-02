import axios from 'axios';
import api from './api';

const userApi = api + '/users';
const cookies = { withCredentials: true };

class UserApi {
    static get() {
        return axios.get(userApi, cookies)
            .then(response => {
                return response.data;
            });
    }

    static add(user) {
        return axios.post(userApi, user, cookies)
            .then(response => {
                return response.data;
            });
    }

    static edit(user){
        return axios.put(userApi, user, cookies)
            .then(() => { return user; });
    }
}

export default UserApi;