import axios from 'axios';
import api from './api';

const loginApi = api + '/account/signin';
const refreshApi = api + '/account/refresh';
const confirmApi = api + '/account/confirm';

class UserApi {
    static signin(email, password) {
        return axios.post(loginApi, { email, password },
            {
                withCredentials: true,
                validateStatus: function (status) {
                    return status < 500;
                }
            }).then(response => response);
    }

    static refresh() {
        return axios.post(refreshApi, null, {
            withCredentials: true,
            validateStatus: function (status) {
                return status < 500;
            }
        }).then(response => response);
    }

    static confirm(info) {
        return axios.post(confirmApi, info, {
            withCredentials: false
        }).then(response => response.data);
    }
}

export default UserApi;