import { FETCH_USERS, FETCH_USER } from "../actions/users";

export default function(state = null, action) {
 
  switch (action.type) {
  
     case FETCH_USERS:
      console.log("reducer",action.payload);
     return action.payload;
     case FETCH_USER:
     return action.payload;
    default:
      return state;
  }
}
