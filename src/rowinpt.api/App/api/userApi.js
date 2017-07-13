import Axios from "axios";
import Api from "./api";

const userApi = Api + "/users";
const cookies = { withCredentials: true };

class UserApi {
    static get() {
        return Axios.get(userApi, cookies)
            .then(response => {
                return response.data;
            });
    }

    static add(user) {
        return Axios.post(userApi, user, cookies)
            .then(response => {
                return response.data;
            });
    }

    static edit(user){
        return Axios.put(userApi, user, cookies)
            .then(response => { return response; });
    }
}

export default UserApi;