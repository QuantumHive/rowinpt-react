import axios from 'axios';
import api from './api';

const userApi = api + '/users';

class UserApi {
    static get() {
        return axios.get(userApi)
            .then(response => {
                return response.data;
            });
    }

    static add(user) {
        return axios.post(userApi, user)
            .then(response => {
                return response.data;
            });
    }
}

export default UserApi;