import { combineReducers } from 'redux';
import navigation from './navigationReducer';
import schedule from './scheduleReducer';
import cache from './cacheReducer';
import agenda from './dashboardReducer';
import users from './usersReducer';
import authenticationContext from './authenticationReducer';

const rootReducer = combineReducers({
    command: navigation,
    schedule,
    cache,
    agenda,
    users,
    authenticationContext
});

 export default rootReducer;