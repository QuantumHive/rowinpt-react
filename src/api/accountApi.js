import axios from 'axios';
import api from './api';

const loginApi = api + '/account/signin';
const refreshApi = api + '/account/refresh';

class UserApi {
    static signin(email, password) {
        return axios.post(loginApi, { email, password })
            .then(response => response.data);
    }

    static refresh(){
        return axios.post(refreshApi, null, {
            withCredentials: true,
        }).then(response => response.data);
    }
}

export default UserApi;