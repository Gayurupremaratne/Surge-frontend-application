import React, { Component, useState } from "react";
import { Button, Label, Col, Row, Input, FormGroup, Card, Container, CardBody } from "reactstrap";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
    Modal,
    ModalHeader,
    ModalBody,
    NavLink,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


import { getUsers, getUserById } from "../../actions/users";

class Users extends Component {
    constructor(props) {
        super(props);
        this.viewModal = this.viewModal.bind(this);

        this.state = {
            users: [],
            modal: false
        };

    }
    componentDidMount() {


        this.props.getUsers()

    }

    componentDidUpdate(prev) {
        if (prev.users !== this.props.users) {
            this.setState({ users: this.props.users });
        }

    }



    viewModal() {
        this.setState({ modal: !this.state.modal });
    }


    get_Users(rows) {



        return rows.map((row) => {

            return (

                <tr key={row._id}>
                    <td>{row.firstName}</td>
                    <td>{row.email}</td>
                    <td>
                        <Button outline color="danger" style={{ marginLeft: 5 }} onClick={this.viewModal}>
                            <i className="fa fa-trash"></i>
                        </Button>
                       
                        <Modal // delete confirmation modal
                            isOpen={this.state.modal}
                            toggle={this.viewModal}
                            className={this.props.className}
                        >
                            <ModalHeader toggle={this.viewModal}>View User details</ModalHeader>
                            <ModalBody>

                                <Container className="mt-5">
                                    <Card>
                                        <CardBody>
                                            <Row>

                                                <Col xs="12" lg="6">
                                                    <FormGroup>
                                                        <Label for="exampleSelect">First name</Label>
                                                        <Input
                                                            type="disabled"
                                                            name="firstname"
                                                            value={row.firstName}>

                                                        </Input>

                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Label for="exampleSelect">Last name</Label>
                                                        <Input

                                                            type="disabled"
                                                            name="lastname"
                                                            value={row.lastName}
                                                        >

                                                        </Input>

                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="exampleSelect">Email</Label>
                                                        <Input

                                                            type="disabled"
                                                            name="email"
                                                            value={row.email}
                                                        >

                                                        </Input>

                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="exampleSelect">Date of Birth</Label>
                                                        <Input

                                                            type="disabled"
                                                            name="dob"
                                                            value={row.dateOfBirth}
                                                        >

                                                        </Input>

                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="exampleSelect">Mobile Number</Label>
                                                        <Input

                                                            type="disabled"
                                                            name="no"
                                                            value={row.mobile}
                                                        >

                                                        </Input>

                                                    </FormGroup>

                                                </Col>
                                            </Row>


                                        </CardBody>
                                    </Card>
                                </Container>
                            </ModalBody>
                        </Modal>

                    </td>


                </tr>
            );
        });
    };


    render() {
        const navItem = {
            borderWidth: 2,
            borderColor: "#ef6e2f",
            marginLeft: 10
        };

        return (
            <div className="container">
                <div className="row">
                    <div className="col" style={{ marginTop: 50 }}>

                        <div className="card">
                            <div className="card-header">

                            </div>
                            <div className="card-body">
                                <table className="table table-responsive-sm table-striped">
                                    <thead>
                                        <tr>
                                            <th>First name</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.get_Users(this.state.users)

                                        }
                                        {console.log("table", this.state.users)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




function mapStateToProps({ users }) {
    return {
        users
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getUsers,
            getUserById

        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);
