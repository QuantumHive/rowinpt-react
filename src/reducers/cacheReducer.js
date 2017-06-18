import * as type from '../constants/actionTypes';

export default function cacheReducer(state = null, action) {
    switch(action.type){
        case type.REFRESH_CACHE:
            return action.cache;
        default:
            return state;
    }
}