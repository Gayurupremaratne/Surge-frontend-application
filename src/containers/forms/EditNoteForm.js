import React, { Component } from "react";

import {
  Button,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormText,
  FormGroup
} from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { editNote } from "../../actions/notes";
import { openDialog } from 'redux-reactstrap-modal';



const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? "Really? You still use AOL for your email?"
    : undefined;

class EditNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: this.props.processing,
      error_msg: ""
    };
  }

  onSubmit(values) {
    console.log(values)
     this.props.editNote(values);
  }

  componentWillUpdate(prevProps){
    // if (prevProps.user !== this.props.user) {
    //   const path = localStorage.getItem("path");
    //   console.log("im here")
    //   window.location.href = {path}
    // } else {
      
    // }
  }
  

  render() {
    const { handleSubmit, submitting } = this.props;
 
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h1>Edit note</h1>

        {/* <p className="text-muted">Sign In to your account</p> */}
        <FormText color="danger">{this.state.error_msg}</FormText>
        <Field
          
          icon="fa fa-user"
          type="hidden"
          label="id"
          name="id"

        />
        <Field
          component={renderField}
          icon="fa fa-user"
          type="text"
          label="Title"
          name="title"

        />
        <Field
          component={renderField}
          icon="fa fa-user"
          type="textarea"
          label="Description"
          name="description"

        />
        
        
        <Row>
          <Col xs="6">
            <Button
              color="primary"
              disabled={submitting}
              type="submit"
              //onSubmit={SendMail}
            ><i class="fas fa-sign-in-alt"></i>  Update
            </Button>
          </Col>
        </Row>
  
      </form>
    );
  }
}
const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.email = "Please enter the title";
  }
  if (!values.description) {
    errors.email = "Please enter the description";
  }

  return errors;
};   

const renderField = ({
  input,
  label,
  type,
  icon,
  meta: { touched, error }
}) => (
  <FormGroup className="mb-3">
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className={icon}></i>
        </InputGroupText>
      </InputGroupAddon>
      <Input {...input} type={type} placeholder={label} />
      <br />
    </InputGroup>
    {touched && (error && <FormText color="danger">{error}</FormText>)}
  </FormGroup>
);

function mapStateToProps({ processing, user }) {
  return {
    processing,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
        editNote,
      openDialog
    },
    dispatch
  );
}

let EditNoteFormData = reduxForm({ validate, form: "EditNoteFormData" })(EditNoteForm);
EditNoteFormData = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNoteFormData);
export default EditNoteFormData;
