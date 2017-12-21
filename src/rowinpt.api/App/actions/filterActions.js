import { FILTER_AGENDA_LOCATION } from "../constants/actionTypes";

export function filterLocation(locationId) {
    return {
        type: FILTER_AGENDA_LOCATION,
        locationId
    }
}