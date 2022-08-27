import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Row, Col, Container, FormGroup, Input, FormText, Card, CardBody, CardFooter, Collapse, CardHeader, Label } from 'reactstrap';
import LoginForm from "./forms/LoginForm";

import {
    AppHeader
} from "@coreui/react";


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
      
    }
    

    render() {

        return (

            <div className="app">

                <AppHeader >
                    
                </AppHeader>
             
                <div className="app-body">
                    <main className="main" >
                        <Col>
                            <Row className="justify-content-center">
                                <Card className="main-card">
                                <CardBody>
                                <LoginForm/>
                                </CardBody>
                                </Card>
                            </Row>
                        </Col>
                    </main>
                </div>
            </div>


        );
    }

}

function mapStateToProps({ somedata }) {
    return { somedata };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
       
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
