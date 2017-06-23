import { combineReducers } from 'redux';
import users from './userReducer';
import navigation from './navigationReducer';
import schedule from './scheduleReducer';
import cache from './cacheReducer';
import agenda from './dashboardReducer';

const rootReducer = combineReducers({
    command: navigation,
    users,
    schedule,
    cache,
    agenda
});

 export default rootReducer;