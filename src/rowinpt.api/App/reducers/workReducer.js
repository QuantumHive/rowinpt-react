import * as type from '../constants/actionTypes';

export default function workReducer(state = { items: [], isLoading: false }, action) {
    switch (action.type) {
        case type.START_LOAD_WORK:
            return {
                items: [...state.items],
                isLoading: true
            };
        case type.LOAD_WORK_SUCCESS:
            return {
                items: [...action.work],
                isLoading: false
            };
        default:
            return state;
    }
}