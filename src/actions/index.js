import axios from "axios";
import jwt_decode from "jwt-decode";
import { toastr } from 'react-redux-toastr';
import { closeDialog } from 'redux-reactstrap-modal';
import { BASE_URL } from '../config/globals';
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const CHECK_LOGGED_IN = "CHECK_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const CREATE_USER = "CREATE_USER";
export const REGISTER_STUDENTS = "REGISTER_STUDENTS";



let token = localStorage.getItem('access_token');
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = token
axios.defaults.headers.common['Content-Type'] = "application/json";



export const SendMail = (props) => {
    
    return (dispatch, getState) => {

  
      const url = `/user/sendmail`;
  
      axios.post(`${url}`,
        props
      ).then(function (response) {
        if (response.data.status) {
          localStorage.setItem("temporary_token", response.data.data)
            dispatch(closeDialog("SIGNUP"))
          toastr.success('Success', 'Email sent. Please check your mail to proceed');
        } else {
          console.log("err:", response.code);
        }
      });
  
    }
  
  }


export const login = (props) => {

  const url = `/user/login`;

  return (dispatch, getState) => {
    
   const data= {
      email: props.email,
      password: props.password
    }
    
    axios.post(`${url}`,
      data
    ).then(function (response) {
      console.log("response", response)
     
      if (response.data.status) {
        dispatch({
          type: USER_LOGGED_IN,
          payload: "logged_in",
        });
        localStorage.setItem("access_token", response.data.data)
        //console.log("userthis", response.data)
        var decoded = jwt_decode(response.data.data);
        console.log("decoded type", decoded)
        if (decoded.type === "student" && decoded.status === true) {
          
            window.location.href = "/sign-up";
          
        } else if(decoded.type === "student" && decoded.status === false){
            window.location.href = "/notes";
        }
        
        else if(decoded.type === "admin"){
          window.location.href = "/users";
        }
        // localStorage.setItem('user', JSON.stringify({
        //   id: response.data.data.owner_id,
        //   username: response.data.data.username,

        // }));
        localStorage.setItem('token', response.data.data.token)
        // localStorage.setItem('id', response.data.data.owner_id)
        // localStorage.setItem('username', response.data.data.username)
        // localStorage.setItem('type', 'owner')
        

        
      } else {
        toastr.error('failed', 'Please enter valid email or password');
      }

      

    }).catch(function (error) {
      dispatch({
        type: ERROR_MESSAGE,
        payload: {
          type: ERROR_MESSAGE,
          message: "Invalid username or password"
        }
      });
      // console.log("login failed")
    });


  }
}
export const logout = props => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_LOGGED_OUT,
      payload: null
    });
    window.location.href = "/main";
  };
};

export const add_User = (props) => {

  return (dispatch, getState) => {

    const url = `/user/register`;

    axios.post(`${url}`,
      props
    ).then(({ data }) => {
      console.log("add user", data)
      toastr.success('Success', 'Thank you for signing up. Login to continue');
      window.location.href = "/main";
    });
  }

}

