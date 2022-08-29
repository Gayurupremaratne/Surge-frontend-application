import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AppNavbarBrand } from "@coreui/react";
import { bindActionCreators } from "redux";
import logo from "../assets/react.png";
import { withRouter } from 'react-router-dom';
import { logout } from "../actions/index";
import { openDialog } from 'redux-reactstrap-modal';
import { Button, Card, CardBody } from "reactstrap";
const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class Header extends Component {
  constructor(props) {
    super(props);
  }


  onlogoClick() {
    window.location.href = "/main";
  }

  render() {

    return (

      <React.Fragment>

        <AppNavbarBrand className="logo" onClick={this.onlogoClick}
          full=
          {{ src: logo, width: 105, height: 52, alt: "EasyBooking Logo" }}
          minimized={{
            src: logo,
            width: 25,
            height: 25,
            alt: "Surge Icon",

          }}
        />
       <div className="logoutbtn"><Button color="#ef6c00" className="btn btn-primary"  onClick={() =>  this.props.logout() }>LOGOUT</Button></div>
        

            
            

          
    
      </React.Fragment>

    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

function mapStateToProps({ somedata }) {
  return {
    somedata
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      
      logout,
      openDialog
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
