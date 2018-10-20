import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withState } from '../../HOCs/WithState';
import WithLoading from '../../HOCs/WithLoading';
import HttpRequest from '../../utils/HttpRequest';
import ContactsTable from './ContactsTable';
import { Grid, Row, Col, Button, DropdownButton, MenuItem } from "react-bootstrap";

import "./Home.css";

const ContactsTableWithLoading = WithLoading(ContactsTable);

class Home extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      contactsLoading: true,
      selectedRowIndex: null
    };
  }

  componentDidMount() {
    console.log('*** componentDidMount @ Home ***');
    console.log('this.props @ Home.js: ', this.props);

    if (!this.props.state.contacts || this.props.state.contacts.length === 0) {
      // Contacts have not been fetched yet, quering the DB.
      this.fetchContacts();
    }
    else {
      // Contacts have already been fetched, no need to query the DB.
      this.setState({ contactsLoading: false });
    }
  }

  async fetchContacts() {
    const response = await HttpRequest('GET', 'contacts');
    console.log('contactsFetched: ', response);

    this.setState({ contactsLoading: false });
    // Store contacts in common state so we don't need to refetch them
    this.props.state.setContacts(response.contacts);
  }

  selectRow = (selectedRowIndex) => {
    console.log('data @ selectRow: ', selectedRowIndex);
    if (this.state.selectedRowIndex === selectedRowIndex) {
      this.setState({ selectedRowIndex: null })
    }
    else {
      this.setState({ selectedRowIndex });
    }
  }

  handleAction = (action) => {
    console.log('action: ', action)
  }

  render() {
    return (
      <div className="Home__main">
        <Grid>
          <Row className="show-grid">

            <Col xs={12} className="Home__page-title main-accent-color">
              <h1>Contacts Page</h1>
            </Col>

            <Col xs={12} className="Home__action-btns">

              <Link to="/contact/new">
                <Button type="button" bsStyle="success" bsSize="lg" className="Home__add-btn">Add contact</Button>
              </Link>

              <DropdownButton title="Actions" bsSize="lg" key="1" id={`dropdown-basic-1`}>
                <MenuItem onSelect={this.handleAction} eventKey="edit">Edit</MenuItem>
                <MenuItem onSelect={this.handleAction} eventKey="delete">Delete</MenuItem>
              </DropdownButton>
              
            </Col>

            <Col xs={12}>
              <ContactsTableWithLoading 
                isLoading={this.state.contactsLoading}
                indicatorType={'squares'}
                contacts={this.props.state.contacts}
                selectRow={this.selectRow}
                selectedRowIndex={this.state.selectedRowIndex}
              />
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }

}

export default withState(Home);