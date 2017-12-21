import { FILTER_AGENDA_LOCATION } from '../constants/actionTypes';

export default (state = {locationId: 0}, action) =>
{
    switch(action.type) {
        case FILTER_AGENDA_LOCATION:
            return { locationId: action.locationId };
        default:
            return state;
    }
}