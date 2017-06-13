import * as type from '../constants/navigationTypes';

export default function navigationReducer(state = null, action) {
    switch (action.type) {
        case type.SET_COMMAND: {
            switch (action.routePath) {
                case '/':
                    return {
                        name: 'Inplannen',
                        url: '/agenda/location'
                    };
                case '/settings/users':
                    return {
                        name: 'Klant toevoegen',
                        url: '/settings/create/user'
                    };
            }
            return null;
        }
        default:
            return state;
    }
}