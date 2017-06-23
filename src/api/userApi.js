import db from './db';
import _ from 'lodash';

let id = 1;

class UserApi {
    static getAllUsers() {
        return new Promise((resolve) => {
            resolve(db.users.map(u => Object.assign({}, u)));
        });
    }

    static addUser(user){
        return new Promise((resolve) => {
            const newUser = Object.assign({}, user);
            newUser.id = id;
            db.users.push(newUser);
            id++;
            resolve(newUser);
        });
    }

    static editUser(source){
        return new Promise((resolve) => {
            const destination = _.find(db.users, {id: source.id});
            destination.firstName = source.firstName;
            destination.lastName = source.lastName;
            destination.mobile = source.mobile;
            destination.attendedTrainingSubscription = source.attendedTrainingSubscription;
            destination.smallGroupSubscription = source.smallGroupSubscription;
            destination.groupTrainingSubscription = source.groupTrainingSubscription;
            resolve(destination);
        });
    }
}

export default UserApi;