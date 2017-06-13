import { combineReducers } from 'redux';
//import users from './userReducer';
import navigation from './navigationReducer';

const rootReducer = combineReducers({
    command: navigation
});

 export default rootReducer;