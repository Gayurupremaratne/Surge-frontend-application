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



let user = JSON.parse(localStorage.getItem('user'));
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = user ? user.token : '';
axios.defaults.headers.common['Content-Type'] = "application/json";



export const SendMail = (props) => {
    
    return (dispatch, getState) => {
    //   const obj = {
    //     email: props.email,
       
    //   }
  
      const url = `/user/sendmail`;
  
      axios.post(`${url}`,
        props
      ).then(function (response) {
        if (response.data.status) {
            console.log(response.data)
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
    //console.log("data", props)
    axios.post(`${url}`,props
    //   {
    //     username: props.email,
    //     password: props.password
    //   }
    ).then(function (response) {
      if (response.data.status) {
        localStorage.setItem("access_token", response.data.data)
        //console.log("userthis", response.data)
        var decoded = jwt_decode(response.data.data);
        console.log("decoded", decoded)
        if (decoded.type == "student" ) {
          if(decoded.status === 1){
            window.location.href = "/sign-up";
          }else{
            
          }
        } else if(decoded.type == "admin"){
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
        

        dispatch({
          type: USER_LOGGED_IN,
          payload: "logged_in",
        });
        
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

// export const Registerstudent = (props) => {
//   console.log('register', props)
//   return (dispatch, getState) => {
//     const obj = {
//       username: props.username,
//       password: props.password
//     }
//     let payment =localStorage.getItem('payment');
//     let payment_type =localStorage.getItem('payment_type');
//     let student_id =localStorage.getItem('student_id');
//     let hostelID =localStorage.getItem('hostelID');
//     let owner_id =localStorage.getItem('owner_id');
//     const amount = localStorage.getItem('exact_price');
//     const obj1={
//       payment,
//    payment_type,
//    student_id,
//    hostelID,
//    owner_id,
//    amount
//    }

//     const url = `/student/register`;

//     axios.post(`${url}`,
//       props
//     ).then(function (response) {
//       if (response.data.status) {
//         toastr.success('Success', 'Successfully booked');
        
//         dispatch(booking(obj1))
//         dispatch(studLogin(obj));
//       } else {
//         console.log("err:", response.code);
//       }
//     });

//   }

// }

// export const add_User = (props) => {

//   return (dispatch, getState) => {

//     const obj = {
//       username: props.username,
//       password: props.password
//     }
//     const url = `/owner/register`;

//     axios.post(`${url}`,
//       props
//     ).then(({ data }) => {
//       console.log("response", data)
//       toastr.success('Success', 'Successfully register');

//       dispatch(closeDialog('REGISTERUSER'));
//       dispatch(login(obj));
//     });
//   }

// }

