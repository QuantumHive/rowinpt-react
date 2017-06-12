import db from './db';
import _ from 'lodash';

class UserApi {
    static getAllUsers() {
        return new Promise((resolve) => {
            resolve(db.users);
        });
    }

    static getUserById(/*id*/){
        return new Promise((resolve) => {
            const user = _.head(db.users);
            resolve(user);
        });
    }
}

export default UserApi;