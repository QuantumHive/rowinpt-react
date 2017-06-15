import * as type from '../constants/actionTypes';
import * as paths from '../constants/routePaths';

export default function navigationReducer(state = null, action) {
    switch (action.type) {
        case type.SET_COMMAND: {
            switch (action.routePath) {
                case '/':
                    return {
                        name: 'Inplannen',
                        url: paths.Schedule
                    };
                case '/settings/users':
                    return {
                        name: 'Klant toevoegen',
                        url: paths.UserSettings
                    };
            }
            return null;
        }
        default:
            return state;
    }
}