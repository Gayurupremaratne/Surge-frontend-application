import React, { Component, useState } from "react";
import { Button } from "reactstrap";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Label, Input } from "reactstrap";
import { Nav, NavItem } from "reactstrap";
import { openDialog } from 'redux-reactstrap-modal';
import {
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getNotesByUserId, getNoteById } from "../../actions/notes";
import AddNoteForm from '../forms/AddNoteForm';

class Mynotes extends Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onQuickClick = this.onQuickClick.bind(this);
    this.createModel = this.createModel.bind(this);
    this.deleteModel = this.deleteModel.bind(this);
    this.state = {
      notes: [],
      value: '',
      modal: false,
      modal2: false
      // isInEditMode: false
    };

  }
  componentDidMount() {
    // var access_token = localStorage.getItem("access_token");
    // if (access_token == null) {
    //   this.props.history.push("/login");
    // }

    this.props.getNotesByUserId();
    // this.props.createCategory();
  }

  componentDidUpdate(prev) {
    //console.log('props',this.props.categories)
    if (prev.notes !== this.props.notes) {
      this.setState({ notes: this.props.notes });
    }

  }

  createModel() {
    this.setState({ modal: !this.state.modal });
  }
  deleteModel() {
    this.setState({ modal2: !this.state.modal2 });
  }
  modalclose() {
    this.setState({ modal2: this.state.modal2 });
  }



  onDeleteClick(row) {
    console.log('id----', row.id)
  }
  //rendering details to the table
  get_notes(rows) {
    //const { categories } = this.props;

    // if (categories) {
    return rows.map((row) => {

      return (
        //  <tr key={row.index}>
        <tr key={row.id}>
          <td>{row.title}</td>
         
          <td>
            
            <Button style={{ marginLeft: 5 }} outline color="success" onClick={() => { this.props.openDialog('NOTES') }}>
              <i className="fa fa-pencil"></i>
            </Button>
            <Button style={{ marginLeft: 5 }} outline color="success">
              <i className="fa fa-eye"></i>
            </Button>

            <Button outline color="danger" style={{ marginLeft: 5 }} onClick={this.deleteModel}>
              <i className="fa fa-trash"></i>
            </Button>

          </td>

          <Modal // delete confirmation modal
            isOpen={this.state.modal2}
            toggle={this.deleteModel}
            className={this.props.className}
          >
            <ModalHeader toggle={this.deleteModel}>Delete</ModalHeader>
            <ModalBody>
              <Button 
              //onClick={() => { this.props.deleteCategory(row) }}
                >Yes</Button>
              <Button style={{ marginLeft: 5 }}>No </Button>
            </ModalBody>
          </Modal>
        </tr>
      );
    });
  };

  editCategory = (event) => {
    event.preventDefault();

    const name = this.state.value;
    const id = event.target.id.value;
    console.log(id, name);
    //this.props.editCategory(name, id);
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  onQuickClick() {
    window.location.href = "/CategoryPrice";
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const navItem = {
      borderWidth: 2,
      borderColor: "#ef6e2f",
      marginLeft: 10
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col" style={{ marginTop: 50 }}>
            <Nav style={{ marginBottom: 10 }}>
              <Nav className="ml-auto">
                <NavItem style={navItem}>
                  <Button color="#ef6c00" className="btn btn-primary" onClick={this.createModel}> Create note</Button>

                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.createModel}
                    className={this.props.className}
                  >
                    <ModalHeader toggle={this.createModel}>Add Note</ModalHeader>
                    <ModalBody>
                   <AddNoteForm/>
                    </ModalBody>
                  </Modal>

                </NavItem>
              </Nav>
            </Nav>

            <div className="card">
              <div className="card-header">
                <i className="fa fa-calendar-plus-o"></i> My Notes
              </div>
              <div className="card-body">
                <table className="table table-responsive-sm table-striped">
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.get_notes(this.state.notes)

                    }
                     { console.log("table",this.state.notes)}
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




function mapStateToProps({ notes }) {
  return {
   notes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
        getNotesByUserId, 
        getNoteById,
        openDialog
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mynotes);
