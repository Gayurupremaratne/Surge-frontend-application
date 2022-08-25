import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';


class App extends Component {


    render() {

        return (
            <div>
                <div>Hello </div>
                <ReduxToastr />
                <BrowserRouter>
                    <Switch>

                    </Switch>

                </BrowserRouter>
                
            </div>

        );
    }
}



export default connect(null, null)(App);
