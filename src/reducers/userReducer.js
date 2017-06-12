export default function userReducer(state = [], action) {
    switch (action.type) {
        case 'LOAD_USERS':
            return action.users;
        case 'GET_USER':
            return action.user;
        default:
            return state;
    }
}