import { combineReducers } from "redux";
import navigation from "./navigationReducer";
import schedule from "./scheduleReducer";
import cache from "./cacheReducer";
import agenda from "./dashboardReducer";
import work from "./workReducer";
import users from "./usersReducer";
import authenticationContext from "./authenticationReducer";
import changePassword from "./passwordChangeReducer";
import agendaFilter from "./agendaFilterReducer";

const rootReducer = combineReducers({
    command: navigation,
    schedule,
    cache,
    agenda,
    users,
    authenticationContext,
    work,
    changePassword,
    agendaFilter
});

 export default rootReducer;