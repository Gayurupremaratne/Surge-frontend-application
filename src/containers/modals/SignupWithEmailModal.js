import React, { Component } from "react";
import reduxDialog, { closeDialog, openDialog } from "redux-reactstrap-modal";
import { connect } from "react-redux";
import { compose } from "recompose";
import { bindActionCreators } from "redux";
import SignupWithEmailForm from "../forms/SignupWithEmailForm";
import { Card, CardBody } from "reactstrap";


class SignupWithEmailModal extends Component {
  render() {
  
    return (
  
       <Card>
        <CardBody>
          <SignupWithEmailForm/>
        </CardBody>
      </Card>
        

    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeDialog, openDialog }, dispatch);
}
const WithDialog = compose(
  reduxDialog(connect, {
    name: "SIGNUP",
    centered: true,
    //className: "modal-right"
  })
)(SignupWithEmailModal);
const ConnectedWithDialog = connect(null, mapDispatchToProps)(WithDialog);

export default ConnectedWithDialog;
