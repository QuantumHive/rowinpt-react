const defaultState = () => {
    return {
        success: false,
        error: false
    };
}

export default (state = defaultState(), action) =>
{
    switch (action.type) {
        case "PASSWORD_CHANGE_RESET":
            return defaultState();
        case "PASSWORD_CHANGE_SUCCESS":
            return { success: true, error: false };
        case "PASSWORD_CHANGE_ERROR":
            return { success: false, error: true };
        default:
            return state;
    }
}