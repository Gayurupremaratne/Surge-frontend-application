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
import { createNote } from "../../actions/notes";
import { openDialog } from 'redux-reactstrap-modal';
import moment from "moment";





class AddNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: this.props.processing,
      error_msg: ""
    };
  }

  onSubmit(values) {
    var todayObj = new Date();
    var today = moment(
      todayObj.getFullYear() +
      "-" +
      (todayObj.getMonth() + 1) +
      "-" +
      todayObj.getDate()
    ).format("YYYY/MM/DD");
    const obj = {
      title: values.title,
      description: values.description,
      createdDate: today
    }
    console.log("noteform",obj)

    this.props.createNote(obj);
  }

  componentWillUpdate(prevProps) {
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
       
        <FormText color="danger">{this.state.error_msg}</FormText>

        <Field
          component={renderField}
         
          type="text"
          label="Title"
          name="title"

        />
        <Field
          component={renderField}
          
          type="textarea"
          label="Description"
          name="description"

        />


        <Row>
          <Col xs="6">
            <Button
              color="success"
              disabled={submitting}
              type="submit"
            //onSubmit={SendMail}
            ><i class="fa fa-plus-square" aria-hidden="true"></i>  ADD
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
      createNote,
      openDialog
    },
    dispatch
  );
}

let AddNoteFormData = reduxForm({ validate, form: "AddNoteFormData" })(AddNoteForm);
AddNoteFormData = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNoteFormData);
export default AddNoteFormData;
