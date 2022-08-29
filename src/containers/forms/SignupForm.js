import React, { Component } from 'react';
import { Button, InputGroup, Input, InputGroupAddon, InputGroupText, Row, FormText, FormGroup, Card, CardBody, Col, Container, Form, Label, CardHeader } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toastr } from "react-redux-toastr";
import moment from "moment";
import { add_User } from "../../actions/index";

class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitting: this.props.processing,
            dob: new Date(),
            selecteddate:""
        };
        //this.handleChange = this.handleChange.bind(this);
    };

    onSubmit(values) {
        const data = {
            "fname": values.fname,
            "lname": values.lname,
            "email": values.email,
            "mobile": values.mobile,
            "password": values.rpassword,
            "dob": this.state.selecteddate
        }
        
        console.log(data)
        this.props.add_User(data);


    }
    handleChange = (event, input) => {
        
        var todayObj = new Date();
        var today = moment(
            todayObj.getFullYear() +
            "-" +
            (todayObj.getMonth() + 1) +
            "-" +
            todayObj.getDate()
        ).format("YYYY/MM/DD");
        var selectedDay = moment(event).format("YYYY/MM/DD");
        let err = "";
        if (today >= selectedDay) {
           
            this.setState({
                dob: event,
                selecteddate:selectedDay
            });
           
        } else if (today < selectedDay) {
            err = "Please select a date before today\n";
            toastr.error("Error", err);
        }
    };




    render() {
        const { handleSubmit, submitting } = this.props

        return (

            <Container>
                <Row className="justify-content-center">
                    <Col md="9" lg="7" xl="6">
                        {/* <Card className="RegisterCard"> */}
                        <Card className="mt-4 border">

                            {/* <CardBody className="p-4"> */}
                            <CardBody>
                                <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                    <h1>Register</h1>
                                    <p className="text-muted">Create your account</p>
                                    {/* <Row>
                                    <Col icon="fa fa-user">
                                            <Label >Date of Birth</Label>
                                            </Col>
                                            <Col>
                                          
                                                <DatePicker
                                                label="date"
                                                    className="form-control"
                                                    dateFormat="yyyy-MM-dd"
                                                    selected={this.state.publish_date}
                                                    onChange={this.handleChange}
                                                    className="form-control"
                                                />
                                            
                                     
                                            </Col>
                                            </Row> */}
                                            <Container>                            
                                                <Label >Date of Birth</Label>
                                    <Card>
                                        
                                        
                                        <DatePicker
                                            
                                                    className="form-control"
                                                    dateFormat="yyyy-MM-dd"
                                                    selected={this.state.dob}
                                                    onChange={this.handleChange}
                                                    
                                                />
                                               
                                                </Card>
                                                </Container>
                                    <FormGroup className="mb-3">
                                    <Field type="text" component={renderField} label="First name" name="fname" icon="fa fa-user" />
                                    
                                    <Field type="text" component={renderField} label="Last name" name="lname" icon="fa fa-user" />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                    <Field type="text" component={renderField} label="Email" name="email" icon="fa fa-user" />
                                    <Field type="text" component={renderField} label="Mobile Number" name="mobile"  icon="fa fa-user"/>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                    <Field type="password" component={renderField} label="Password" name="password" icon="fa fa-asterisk" />
                                    <Field type="password" component={renderField} label="Confirm password" name="rpassword" icon="fa fa-asterisk" />
                                    </FormGroup>
                                    <FormGroup className="mb-3 text-right">
                                    <Button color="success" block disabled={submitting} type="submit" size="sm" className="btn-pill">
                                        <i class="fas fa-sign-in-alt"></i> Sign up</Button>
                                        </FormGroup>
                                </Form>
                            </CardBody>

                        </Card>
                    </Col>
                </Row>
            </Container>


        );
    }
}
const validate = values => {
    const errors = {};
    if (!values.fname) {
        errors.name = "Please enter the first name";
    }
    if (!values.lname) {
        errors.name = "Please enter the last name";
    }
    if (!values.address) {
        errors.address = "Please enter the address";
    }


    if (!values.password) {
        errors.password = "Please enter the password";
    }
    if (!values.rpassword) {
        errors.rpassword = "Please enter the password again";
    }
    if (values.password !== values.rpassword) {
        errors.rpassword = "Please enter the matching password";
    }
    return errors;
}

const renderField = ({
    input,
    label,
    type,
    icon,
    meta: { touched, error, warning }
}) => (
    <FormGroup className="mb-3">
        <InputGroup>
            <InputGroupAddon addonType="prepend">
                <InputGroupText>
                    <i className={icon}></i>
                </InputGroupText>
            </InputGroupAddon>
            <Input {...input} type={type} placeholder={label} /><br />
        </InputGroup>
        {touched && ((error && <FormText color="danger">{error}</FormText>))}
    </FormGroup>
)

function mapStateToProps({ processing }) {
    return {
        processing

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    add_User

    }, dispatch);
}


let SignUpFormData = reduxForm({ validate, form: 'SignUpForm' })(SignUpForm);
SignUpFormData = connect(mapStateToProps, mapDispatchToProps)(SignUpFormData);
export default SignUpFormData;
