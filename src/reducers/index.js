import { combineReducers } from 'redux';
import user from './userReducer';
import navigation from './navigationReducer';

const rootReducer = combineReducers({
    command: navigation,
    user
});

 export default rootReducer;