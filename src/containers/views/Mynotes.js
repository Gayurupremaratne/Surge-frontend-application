import React, { Component, useState } from "react";
import { Button } from "reactstrap";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Nav, NavItem } from "reactstrap";
import { openDialog } from 'redux-reactstrap-modal';
import Header from "../Header";
import Popup from "reactjs-popup";
import {
    AppHeader
} from "@coreui/react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
} from "reactstrap";
import moment from "moment";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getNotesByUserId, getNoteById, deleteNote } from "../../actions/notes";
import { TransferWithinAStationRounded } from "@material-ui/icons";


class Mynotes extends Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.deleteModel = this.deleteModel.bind(this);
    this.state = {
      notes: [],
      value: '',
      modal: false,
      modal2: false
      // isInEditMode: false
    };

  }


  // componentDidUpdate(prev) {
  //   //console.log('props',this.props.categories)
  //   if (prev.notes !== this.props.notes) {
  //     this.setState({ notes: this.props.notes });
  //   }

  // }
  componentWillReceiveProps(nextProps) {
    if (this.props.notes !== nextProps.notes) {
      this.setState({ notes: nextProps.notes })
    }

  }
  componentDidMount() {

    this.props.getNotesByUserId();

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
  get_notes() {
    const { notes } = this.state;

    function Deletemodal() {
      this.setState({ modal2: false })
       this.deleteModel()
    }
    return notes.map((note) => {
      console.log('notes1', note)
      const cdate = moment(note.createdDate).format("YYYY/MM/DD")
      return (
        //  <tr key={row.index}>
        <tr key={note.id}>
          <td>{cdate}</td>
          <td>{note.title}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>

            <Button style={{ marginLeft: 5 }} outline color="success" onClick={() => { this.props.openDialog('NOTES', { data: note }) }}>
              <i className="fa fa-pencil"></i>
            </Button>
            <Button style={{ marginLeft: 5 }} outline color="success">
              <i className="fa fa-eye"></i>
            </Button>

            {/* <Button style={{ marginLeft: 5 }} outline color="success" onClick={this.deleteModel}>
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            </Button> */}
            <Popup
              trigger={
                <button
                  type="button"
                  className="btn btn-outline-success outline"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  style={{ marginLeft: 5 }}
                  color="success"
                >
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                  
                </button>
              }
              position="right center" style={{ marginLeft: 5 }}
            >
              <div>
              <Button
              color="success"
                 onClick={() => { this.props.deleteNote(note._id) }}
                
              
         
              >Delete note</Button>
             
         
              </div>
            </Popup>

          </td>
          

          {/* <Modal // delete confirmation modal
            isOpen={this.state.modal2}
            toggle={this.deleteModel}
            className={this.props.className}
          >
            <ModalHeader toggle={this.deleteModel}>Delete</ModalHeader>
            <ModalBody>
              <Button
              color="success"
                 onClick={() => { this.props.deleteNote(note._id) }}
                
              
         
              >Yes</Button>
              <Button style={{ marginLeft: 5 }} color="danger" onClick={() =>  this.deleteModel }>No </Button>
            </ModalBody>
          </Modal> */}
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



  render() {
    const { handleSubmit, submitting } = this.props;
    const navItem = {
      borderWidth: 2,
      borderColor: "#ef6e2f",
      marginLeft: 10
    };

    return (
      <div className="app">

<AppHeader fixed>
         <Header/>
        </AppHeader>
      
      <div className="container">
        
        <div className="row">
          <div className="col" style={{ marginTop: 50 }}>
            <Nav style={{ marginBottom: 10 }}>
              <Nav className="ml-auto">
                <NavItem style={navItem}>
                  <Button color="#ef6c00" className="btn btn-primary" onClick={() => { this.props.openDialog('ADDNOTE') }}><i class="fa fa-plus-square" aria-hidden="true"></i> Create note</Button>

                </NavItem>
              </Nav>
            </Nav>

            <div className="card">
              <div className="card-header">
                <h4 >My Notes</h4> 
              </div>
              <div className="card-body">
                <table className="table table-responsive-sm table-striped">
                  <thead>
                    <tr>
                      <th>Created Date</th>
                      <th>Title</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.get_notes()

                    }

                  </tbody>
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
      deleteNote,
      openDialog
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mynotes);
