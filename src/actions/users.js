import axios from 'axios';
import { BASE_URL } from '../config/globals';
//let user = JSON.parse(localStorage.getItem('user'));
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = "application/json";


export const FETCH_USERS="FETCH_USERS";
export const FETCH_USER="FETCH_USER";


export const getUsers = (props) => {
    
    return (dispatch, getState) => {
        
        const url = `/admin/users`;
        axios.get(`${url}`,
        ).then(({ data }) => {
           console.log("action",data.data)
            
                dispatch({ type: FETCH_USERS, payload: data.data });
            
        });
    }
}

export const getUserById = (id) => {
    return (dispatch, getState) => {
     
      const url = `/admin/user/${id}`;
      axios.get(`${url}`).then(({ data }) => {
            
        dispatch({ type: FETCH_USER, payload: data.data });
    
});
    };
  };