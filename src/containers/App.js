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
import AddNoteModal from './modals/AddNoteModal';
import ProtectedRoute from './ProtectedRoute';
class App extends Component {


    render() {

        return (
            <div>
                <ReduxToastr />
                <BrowserRouter>
                    <Switch>
                    <Route exact path="/notes" name="notes" component={Notes} />
                    <Route exact path="/sign-up" name="signup" component={SignUp} />
                    <ProtectedRoute path="/users" name="users" component={Users}/>
                    <Route path="/" name="Home" component={Home} />
                    </Switch>

                </BrowserRouter>
                <SignupWithEmailModal/>
                <EditNotesModal/>
                <AddNoteModal/>
            </div>

        );
    }
}



export default connect(null, null)(App);
