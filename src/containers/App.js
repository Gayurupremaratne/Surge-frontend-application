import React, { Component } from 'react';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import Home from './Home';
import SignUp from './SignUp';
import Users from './views/Users'
import Notes from './views/Mynotes'
import SignupWithEmailModal from './modals/SignupWithEmailModal';
import EditNotesModal from './modals/EditNotesModal';
import ProtectedRoute from './ProtectedRoute';
class App extends Component {


    render() {

        return (
            <div>
                <ReduxToastr />
                <BrowserRouter>
                    <Switch>
                    <Route path="/" name="Home" component={Home} />
                    <Route exact path="/sign-up" name="signup" render={props => <SignUp />} />
                    <Route exact path="/notes" name="notes" render={props => <Notes/>} />
                    <Route exact path="/users" name="user" render={props => <Users/>} />
                    {/* <ProtectedRoute exact path="/users" component={Users}/> */}
                    </Switch>

                </BrowserRouter>
                <SignupWithEmailModal/>
                <EditNotesModal/>
            </div>

        );
    }
}



export default connect(null, null)(App);
