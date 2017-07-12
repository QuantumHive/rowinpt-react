import cacheApi from '../api/cacheApi';
import { REFRESH_CACHE } from '../constants/actionTypes';

export function loadCacheSuccess(cache){
    return {
        type: REFRESH_CACHE,
        cache
    };
}

export function loadCache(){
    return dispatch => cacheApi.refreshCache().then(cache => dispatch(loadCacheSuccess(cache)));
}