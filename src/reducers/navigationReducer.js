import * as type from '../constants/actionTypes';


export default function navigationReducer(state = null, action) {
    switch (action.type) {
        case type.SET_COMMAND_PRIMARY:
            return action.primary;
        case type.SET_COMMAND_SECONDARY:
            return {
                    primary: null,
                    secondary: {
                        left: {
                            icon: "fa fa-chevron-left",
                            callback: action.leftCallback
                        },
                        right: {
                            icon: "fa fa-chevron-right",
                            callback: action.rightCallback
                        }
                    }
                };
        default:
            return state;
    }
}