import { combineReducers } from 'redux';
import user from './userReducer';
import navigation from './navigationReducer';
import schedule from './scheduleReducer';

const rootReducer = combineReducers({
    command: navigation,
    user,
    schedule
});

 export default rootReducer;