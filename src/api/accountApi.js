import axios from 'axios';
import api from './api';

const loginApi = api + '/account/signin';
const refreshApi = api + '/account/refresh';
const confirmApi = api + '/account/confirm';

class UserApi {
    static signin(email, password) {
        return axios.post(loginApi, { email, password },
        {
            withCredentials: true
        })
            .then(response => response.data);
    }

    static refresh(){
        return axios.post(refreshApi, null, {
            withCredentials: true,
        }).then(response => response.data);
    }

    static confirm(info){
        return axios.post(confirmApi, info, {
            withCredentials: false
        }).then(response => response.data);
    }
}

export default UserApi;