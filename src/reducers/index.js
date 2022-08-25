import { combineReducers } from "redux";
import { dialogReducer } from 'redux-reactstrap-modal';
import { reducer as form } from 'redux-form';
import { reducer as toastr } from 'react-redux-toastr';

const rootReducer = combineReducers({
    dialogReducer,
    form,
    toastr

});

export default rootReducer;
