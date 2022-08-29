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
import { SendMail } from "../../actions/index";
import { openDialog } from 'redux-reactstrap-modal';



const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? "Really? You still use AOL for your email?"
    : undefined;

class SignupWithEmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: this.props.processing,
      error_msg: ""
    };
  }

  onSubmit(values) {
    console.log(values)
     this.props.SendMail(values);
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
        <h1>Sign up with your email</h1>

        {/* <p className="text-muted">Sign In to your account</p> */}
        <FormText color="danger">{this.state.error_msg}</FormText>
        <Field
          component={renderField}
          icon="fa fa-user"
          type="text"
          label="Email"
          name="email"
          validate={email}
          warn={aol}
        />
        
        <Row>
          <Col xs="6">
            <Button
              color="primary"
              disabled={submitting}
              type="submit"
              //onSubmit={SendMail}
            ><i class="fas fa-sign-in-alt"></i>  Login
            </Button>
          </Col>
        </Row>
  
      </form>
    );
  }
}
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Please enter the email";
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
      SendMail,
      openDialog
    },
    dispatch
  );
}

let SignupFormData = reduxForm({ validate, form: "SignupWithEmailForm" })(SignupWithEmailForm);
SignupFormData = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupFormData);
export default SignupFormData;
