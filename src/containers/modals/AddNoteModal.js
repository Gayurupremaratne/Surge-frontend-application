import React, { Component } from "react";
import reduxDialog, { closeDialog, openDialog } from "redux-reactstrap-modal";
import { connect } from "react-redux";
import { compose } from "recompose";
import { bindActionCreators } from "redux";
import AddNoteForm from "../forms/AddNoteForm";
import { Card, CardBody } from "reactstrap";


class AddNotesModal extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return(
     
            
          
           <div className="modal-signin">
           <div className="modal-header">
             <h4 className="modal-title">Add Note</h4>
             <button
               type="button"
               className="close"
               onClick={() => this.props.closeDialog("ADDNOTE")}
             >
               <span aria-hidden="true">
                 <i className="fa fa-times"></i>
               </span>
             </button>
           </div>
          
           <Card><CardBody><AddNoteForm/></CardBody></Card>
          
         </div>
           
    
        
        )

        
    }
}
function mapStateToProps({ processing }) {
    return {
        processing
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeDialog,
        openDialog,
    }, dispatch);
}
const WithDialog = compose(
    reduxDialog(connect, {
        name: "ADDNOTE",
        backdrop: "true",
        centered: true,
        className: "modal-right modal-lg"
    })
)(AddNotesModal);
const ConnectedWithDialog = connect(null, mapDispatchToProps)(WithDialog);

export default ConnectedWithDialog;
