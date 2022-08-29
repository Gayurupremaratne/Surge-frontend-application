import axios from 'axios';
import { BASE_URL } from '../config/globals';
import jwt_decode from "jwt-decode";
import { toastr } from 'react-redux-toastr';
import { closeDialog } from 'redux-reactstrap-modal';
//let user = JSON.parse(localStorage.getItem('user'));
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = "application/json";


export const FETCH_NOTES="FETCH_NOTES";
export const FETCH_NOTE="FETCH_NOTE";
export const EDIT_NOTE="EDIT_NOTE";
export const DELETE_NOTE="DELETE_NOTE";


export const getNotesByUserId = (props) => {
  var decoded = jwt_decode(localStorage.getItem("access_token"));
  console.log("decoded",decoded)
    return (dispatch, getState) => {
        const id=decoded.user_id
        console.log("id",id)
        const url = `/student/notes/${id}`;
        axios.get(`${url}`,
        ).then(({ data }) => {
           console.log("action",data.data)
            
                dispatch({ type: FETCH_NOTES, payload: data.data });
            
        });
    }
}

export const getNoteById = (id) => {
    return (dispatch, getState) => {
     
      const url = `/student/note/${id}`;
      axios.get(`${url}`).then(({ data }) => {
            
        dispatch({ type: FETCH_NOTE, payload: data.data });
    
});
    };
  };

  export const editNote = (props) => {

    // console.log("here")
    return (dispatch) => {
      const url = `/student/note/update/${props.id}`;
      axios.put(`${url}`, props).then(({ data }) => {
        if (data.status) {
          
        
            dispatch(closeDialog('NOTES'));
            dispatch(getNotesByUserId())
            toastr.success("Success", "Successfully updated");

          
     
           
          
        } else {
          toastr.error("We are sorry", "Something went wrong");
        }
        
        dispatch({ type: EDIT_NOTE, payload: data.status });
      });
    };
  };

  export const deleteNote = (props) => {

    console.log("delete",props)
    return (dispatch) => {
      const url = `/student/note/delete/${props}`;
      axios.delete(`${url}`, props).then(({ data }) => {
        if (data.status) {
            
          toastr.success("Success", "Note deleted");
          dispatch(getNotesByUserId())
        } else {
          toastr.error("We are sorry", "Something went wrong");
        }
        dispatch({ type: DELETE_NOTE, payload: data.status });
      });
    };
  };

  export const createNote = (props) => {
    var decoded = jwt_decode(localStorage.getItem("access_token"));
    
    const obj={
      title:props.title,
      description:props.description,
      id:decoded.user_id,
      createdDate:props.createdDate
    }

    return (dispatch, getState) => {

      const url = `/student/note/create`;
  
      axios.post(`${url}`,obj).then(({ data }) => {
        if (data.status) {
            
          toastr.success('Success', 'Note created');
          
        } else {
          toastr.error("We are sorry", "Something went wrong");
        }
       
        dispatch(getNotesByUserId())
        dispatch(closeDialog("ADDNOTE"))
      });
    }
  
  }