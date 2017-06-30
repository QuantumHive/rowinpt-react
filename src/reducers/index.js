import { combineReducers } from 'redux';
import navigation from './navigationReducer';
import schedule from './scheduleReducer';
import cache from './cacheReducer';
import agenda from './dashboardReducer';
import users from './usersReducer';

const rootReducer = combineReducers({
    command: navigation,
    schedule,
    cache,
    agenda,
    users
});

 export default rootReducer;