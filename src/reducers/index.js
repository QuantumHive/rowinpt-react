import { combineReducers } from 'redux';
import user from './userReducer';
import navigation from './navigationReducer';
import schedule from './scheduleReducer';
import cache from './cacheReducer';

const rootReducer = combineReducers({
    command: navigation,
    user,
    schedule,
    cache
});

 export default rootReducer;