import { FETCH_NOTES, FETCH_NOTE, EDIT_NOTE } from "../actions/notes";

export default function(state = null, action) {
 
  switch (action.type) {
  
     case FETCH_NOTES:
      console.log("reducer",action.payload);
     return action.payload;
     case FETCH_NOTE:
     return action.payload;
     case EDIT_NOTE:
     return action.payload;
    default:
      return state;
  }
}
