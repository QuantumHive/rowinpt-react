import Axios from "axios";
import {logoutSuccess} from "./authenticationActions";

export function reset() {
    return {
        type: "PASSWORD_CHANGE_RESET"
    }
}

function success() {
    return {
        type: "PASSWORD_CHANGE_SUCCESS"
    };
}

function error() {
    return {
        type: "PASSWORD_CHANGE_ERROR"
};
}

export function changePassword(data) {
    return dispatch => {
        return Axios.put("/api/account/password/change", data).then(response => {
            dispatch(logoutSuccess());
            dispatch(success());
        }).catch(err => {
            dispatch(error());
            throw err;
        });
    }
}