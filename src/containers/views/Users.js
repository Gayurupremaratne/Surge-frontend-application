import React, { Component, useState } from "react";
import useLocation from 'react-router';
import { Button, Label, Col, Row, Input, FormGroup, Card, Container, CardBody } from "reactstrap";
import "react-confirm-alert/src/react-confirm-alert.css";
import moment from "moment";
import { Link } from 'react-router-dom';
import {
    Modal,
    ModalHeader,
    ModalBody,
    NavLink,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "../Header";
import {
    AppHeader
} from "@coreui/react"
import { getUsers, getUserById } from "../../actions/users";

class Users extends Component {
    constructor(props) {
        super(props);
        this.viewModal = this.viewModal.bind(this);

        this.state = {
            users: [],
            modal: false,
            pager: {},
            pageOfItems: []
        };

    }

    componentWillReceiveProps(nextProps) {
        console.log("nextprops",nextProps)
        // if (nextProps.users !== this.props.users) {
        //   //  this.setState({ pager: this.props.users.pager });
        //     this.setState({ pageOfItems: this.props.users.pageOfItems });
        // }
    
      }
    componentDidMount() {

        const params = new URLSearchParams(this.props.location.search);
        const page = parseInt(params.get('page')) || 1;
        console.log("page",page)
        if (page !== this.state.pager.currentPage) {

            this.props.getUsers(page)


        }

    }

    componentDidUpdate(prev) {
        if (prev.users !== this.props.users) {
            this.setState({ pager: this.props.users.pager });
            this.setState({ pageOfItems: this.props.users.pageOfItems });
        }

    }
 

    loadPage() {
        // get page of items from api

    }


    viewModal() {
        this.setState({ modal: !this.state.modal });
    }


    get_Users() {
        const { pager, pageOfItems } = this.state

        return pageOfItems.map(item => {
            console.log("rowdata", item._id)
            const dob = moment(item.dateOfBirth).format("YYYY/MM/DD")
            return (

                <tr key={item._id}>
                    <td>{item.firstName}</td>
                    <td>{item.email}</td>
                    <td>
                        <Button outline color="danger" style={{ marginLeft: 5 }} onClick={this.viewModal}>
                            <i className="fa fa-eye"></i>
                        </Button>

                        <Modal // delete confirmation modal
                            isOpen={this.state.modal}
                            toggle={this.viewModal}
                            className={this.props.className}
                        >
                            <ModalHeader style={{ background: "green" }} toggle={this.viewModal} ><h4 style={{ color: "white" }}>View user details</h4></ModalHeader>
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
                                                            value={item.firstName}>

                                                        </Input>

                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Label for="exampleSelect">Last name</Label>
                                                        <Input

                                                            type="disabled"
                                                            name="lastname"
                                                            value={item.lastName}
                                                        >

                                                        </Input>

                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="exampleSelect">Email</Label>
                                                        <Input

                                                            type="disabled"
                                                            name="email"
                                                            value={item.email}
                                                        >

                                                        </Input>

                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="exampleSelect">Date of Birth</Label>
                                                        <Input

                                                            type="disabled"
                                                            name="dob"
                                                            value={dob}
                                                        >

                                                        </Input>

                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="exampleSelect">Mobile Number</Label>
                                                        <Input

                                                            type="disabled"
                                                            name="no"
                                                            value={item.mobile}
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
        const { pager, pageOfItems } = this.state
        const navItem = {
            borderWidth: 2,
            borderColor: "#ef6e2f",
            marginLeft: 10
        };

        return (

            <div className="app">
                <AppHeader fixed>
                    <Header />
                </AppHeader>
                <div className="container">
                    <div className="row">
                        <div className="col" style={{ marginTop: 50 }}>

                            <div className="card" >
                                <div className="card-header" style={{ background: "green" }}>
                                    <h4 style={{ color: "white" }}>All Users</h4>
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
                                                this.get_Users()

                                            }
                                            {/* //{console.log("table", this.state.users)} */}
                                        </tbody>

                                        <tr>

                                            <div className="tfooter">
                                                {pager.pages && pager.pages.length &&
                                                    <ul className="pagination">
                                                        <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                                            <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                                                        </li>
                                                        <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                                            <Link to={{ search: `?page=${pager.currentPage - 1}` }} className="page-link">Previous</Link>
                                                        </li>
                                                        {pager.pages.map(page =>
                                                            <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                                                <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                                                            </li>
                                                        )}
                                                        <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                                            <Link to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link">Next</Link>
                                                        </li>
                                                        <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                                            <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link">Last</Link>
                                                        </li>
                                                    </ul>
                                                }
                                            </div>
                                        </tr>
                                    </table>
                                </div>
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
