import { combineReducers } from 'redux';
import users from './userReducer';
import navigation from './navigationReducer';
import schedule from './scheduleReducer';
import cache from './cacheReducer';
import agenda from './dashboardReducer';
import usersAsync from './usersAsyncReducer';

const rootReducer = combineReducers({
    command: navigation,
    users,
    schedule,
    cache,
    agenda,
    usersAsync
});

 export default rootReducer;