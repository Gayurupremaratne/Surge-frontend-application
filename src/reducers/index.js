import { combineReducers } from "redux";
import { dialogReducer } from 'redux-reactstrap-modal';
import { reducer as form } from 'redux-form';
import { reducer as toastr } from 'react-redux-toastr';
import user from "./user";
import usersReducer from "./users";
import notesReducer from "./notes";

const rootReducer = combineReducers({
    dialogReducer,
    form,
    toastr,
    user,
    users:usersReducer,
    notes:notesReducer

});

export default rootReducer;
