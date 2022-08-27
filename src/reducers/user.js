import { USER_LOGGED_IN, ERROR_MESSAGE} from "../actions/";

export default function(state = null, action) {
 
  switch (action.type) {
    case USER_LOGGED_IN:
      
      //console.log("user",action.payload);
      return action.payload;
    //   case USER_LOGGED_OUT:
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("username");
    //   localStorage.removeItem("type");
    //   //localStorage.removeItem("student_id");
    //   localStorage.removeItem("owner_id");
    //   //localStorage.removeItem("id");
    //   return localStorage.getItem("token");
    case ERROR_MESSAGE:
      return action.payload;

    default:
      return state;
  }
}
