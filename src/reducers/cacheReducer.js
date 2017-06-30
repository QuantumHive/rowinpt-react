import { REFRESH_CACHE } from '../constants/actionTypes';

export default function cacheReducer(state = null, action) {
    switch (action.type) {
        case REFRESH_CACHE:
            return action.cache;
        default:
            return state;
    }
}