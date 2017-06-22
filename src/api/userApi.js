import db from './db';

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
}

export default UserApi;