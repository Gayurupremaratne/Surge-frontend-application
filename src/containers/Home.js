import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    AppHeader
} from "@coreui/react";

import routes from "../config/routes";

class Home extends Component {

    render() {
        
        return (
            <div className="app">
        <AppHeader fixed>
         
        </AppHeader>
     
        <div className="app-body">
        

          <main className="main">
           
                        <Switch>
                            {routes.map((route, idx) => {
                                return route.component 
                                    ? (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => <route.component {...props}/>}/>
                                    )
                                    : null;
                            })}
                            
                                 <Redirect from="/" to="/main"/>
                               
                        </Switch>
                    </main>
                </div>
            </div>
        );
    }
}

function mapStateToProps({somedata}) {
    return {somedata};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        //someAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
