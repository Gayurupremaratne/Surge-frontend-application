import React, { Component} from "react";

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
      error_msg: "",
      noteID: "",
      userID: ""
    };
  }

  onSubmit(values) {
    // const nid = this.state.noteID
    // const uid = this.state.userID
    console.log("form",values)
    const obj = {
      "id": values.id,
      "userID": values.userID,
      "title": values.title,
      "description": values.description,
      "createdDate": values.createdDate
    }
    this.props.editNote(obj);
  }



  render() {
    const { handleSubmit, submitting, initialValues } = this.props;
    
    // const nID = initialValues.id
    // const uID = initialValues.userID
 
   
    return (
   //{IDStore},
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h1>Edit note</h1>
      

        {/* <p className="text-muted">Sign In to your account</p> */}
        <FormText color="danger">{this.state.error_msg}</FormText>

        <Field
          component={renderField}
          icon="fa fa-sticky-note"
          type="text"
          label="Title"
          name="title"
        //defaultValue={initialValues.data.title}

        />
        <Field
          component={renderField}
          icon="fa fa-sticky-note"
          type="textarea"
          label="Description"
          name="description"
        //defaultValue={initialValues.data.description}
        />


        <Row>
          <Col xs="6">
            <Button
              color="success"
              disabled={submitting}
              type="submit"
            //onSubmit={SendMail}
            ><i class="fa fa-plus-square" aria-hidden="true"></i>  UPDATE
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
