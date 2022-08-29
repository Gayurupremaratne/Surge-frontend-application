import React, { Component } from "react";
import reduxDialog, { closeDialog, openDialog } from "redux-reactstrap-modal";
import { connect } from "react-redux";
import { compose } from "recompose";
import { bindActionCreators } from "redux";
import EditNoteForm from "../forms/EditNoteForm";
import { Card, CardBody } from "reactstrap";


class EditNotesModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: [],

    };


  }


  render() {
    const { data } = this.props;
    console.log("modaldata",data)
    const obj={
      "id":data.data._id,
      "userID":data.data.userID,
      "title":data.data.title,
      "description":data.data.description,
      "createdDate":data.data.createdDate
    }

    return (
      <div className="modal-signin">
           <div className="modal-header">
             <h4 className="modal-title">Edit Note</h4>
             <button
               type="button"
               className="close"
               onClick={() => this.props.closeDialog("NOTES")}
             >
               <span aria-hidden="true">
                 <i className="fa fa-times"></i>
               </span>
             </button>
           </div>
          
           <Card><CardBody><EditNoteForm initialValues={obj} /></CardBody></Card>
          
         </div>
      
    )

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeDialog,
    openDialog,
    //getNoteById
  }, dispatch);
}
const WithDialog = compose(
  reduxDialog(connect, {
    name: "NOTES",
    backdrop: "true",
    centered: true,
    className: "modal-right modal-lg"
  })
)(EditNotesModal);
const ConnectedWithDialog = connect(null, mapDispatchToProps)(WithDialog);

export default ConnectedWithDialog;
