import * as type from '../constants/actionTypes';
import * as paths from '../constants/routePaths';

export default function navigationReducer(state = null, action) {
    switch (action.type) {
        case type.SET_COMMAND: {
            switch (action.routePath) {
                case paths.default:
                    return {
                        primary: {
                            name: 'Inplannen',
                            url: paths.Schedule
                        },
                        secondary: null
                    };
                case paths.UserSettings:
                    return {
                        primary: {
                            name: 'Klant toevoegen',
                            url: paths.UserSettings
                        },
                        secondary: null
                    };
                case paths.ScheduleDate:
                return {
                    primary: null,
                    secondary: {
                        left: {
                            icon: "fa fa-chevron-left"
                        },
                        right: {
                            icon: "fa fa-chevron-right"
                        }
                    }
                };
                case paths.ScheduleCourse:
                return {
                    primary: null,
                    secondary: {
                        left: {
                            icon: "fa fa-chevron-left"
                        },
                        right: {
                            icon: "fa fa-chevron-right"
                        }
                    }
                };
            }
            return null;
        }
        default:
            return state;
    }
}