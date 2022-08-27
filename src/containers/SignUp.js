import React, { Component } from "react";
import { Button, Col, Row, Card, Label, Container, FormGroup, CardGroup, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import SignupForm from '../containers/forms/SignupForm'

import { AppHeader } from "@coreui/react";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            isOpen: false
        };


    }


    render() {

        return (
            <div className="confirm">
                <AppHeader >


                </AppHeader>

                <Card >
                    <CardBody>
                    <SignupForm />
                    </CardBody>
                </Card>

            </div>

        );
    }
}

function mapStateToProps({ user }) {
    return {
        user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {

        },
        dispatch
    );
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
