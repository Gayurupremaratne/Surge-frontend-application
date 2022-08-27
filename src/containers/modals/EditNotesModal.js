import React, { Component } from "react";
import reduxDialog, { closeDialog, openDialog } from "redux-reactstrap-modal";
import { connect } from "react-redux";
import { compose } from "recompose";
import { bindActionCreators } from "redux";
import EditNoteForm from "../forms/EditNoteForm";
import { getNoteById } from "../../actions/notes";


class EditNotesModal extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          notes:[],
          
        };
    
    
      }
    
      componentDidMount() {
        this.props.getNoteById();
        
      }
    UNSAFE_componentWillReceiveProps(nextProps) {

        if (this.props.notes !== nextProps.notes) {
            this.setState({ notes: nextProps.notes })
        }
        
    }
    render() {
        const { notes } = this.state;
        if (notes) {
            return notes.map(note => {

                const obj={
                    id:note._id,
                    title:note.title,
                    description:note.description
                  }
                  console.lol("mapped",obj)
                  return (
            
        
                    <EditNoteForm initialValues={obj}/>
        
        
                );
            });
        }
        
    }
}
function mapStateToProps({ processing,notes }) {
    return {
      processing,
      notes
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        closeDialog, 
        openDialog,
        getNoteById
     }, dispatch);
}
const WithDialog = compose(
    reduxDialog(connect, {
        name: "NOTES",
        centered: true,
        //className: "modal-right"
    })
)(EditNotesModal);
const ConnectedWithDialog = connect(null, mapDispatchToProps)(WithDialog);

export default ConnectedWithDialog;
