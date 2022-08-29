import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Card, CardBody } from 'reactstrap';
import LoginForm from "./forms/LoginForm";



class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
      
    }
    

    render() {

        return (

            <div className="app">
             
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
