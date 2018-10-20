import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withState } from '../../HOCs/WithState';
import LoadingIndicator from '../../components/LoadingIndicator';
import HttpRequest from '../../utils/HttpRequest';
import {
  FormGroup, FormControl, ControlLabel,
  Button,Checkbox, Radio,
  Grid, Row, Col,
  HelpBlock
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import "./Contact.css";

class Contact extends Component {
  constructor(props) {
    super(props);
  
    // Keep state object properties in alphabetic order.
    this.state = {
      comingToEdit: false,
      contactId: '',
      countries: [],
      countryId: 'AF',
      isCustomer: false,
      isLoading: true,
      isSupplier: false,
      name: '',
      organizationId: '4rw9eImhQVih1RMWEya3wA',
      pageTitle: 'Add New Contact',
      phone: '',
      registrationNo: '',
      type: 'company',
      validationName: null
    }
  }

  componentDidMount() {
    if (this.props.match.params.from !== 'new') {
      // Coming to edit an existing user
      this.setState({ comingToEdit: true, pageTitle: 'Edit Contact' });
      this.initializeEdit(this.props.match.params.from);
    }

    if (!this.props.state.countries || this.props.state.countries.length === 0) {
      // Countries have not been fetched yet, quering the DB.
      this.fetchCountries();
    }
    else {
      // Countries have already been fetched, no need to query the DB.
      this.setState({ countries: this.props.state.countries, isLoading: false });
    }
  }

  initializeEdit(id) {
    const contactToEdit = this.props.state.contacts.find(contact => contact.id === id);

    if (contactToEdit) {
      this.setState({
        name: contactToEdit.name,
        countryId: contactToEdit.countryId,
        isSupplier: contactToEdit.isSupplier,
        isCustomer: contactToEdit.isCustomer,
        type: contactToEdit.type,
        phone: contactToEdit.phone,
        registrationNo: contactToEdit.registrationNo,
        contactId: contactToEdit.id
      });
    }
  }

  async fetchCountries() {
    const response = await HttpRequest('GET', '/countries');
    this.setState({ countries: response.countries, isLoading: false })
    // Store countries in common state so we don't need to refetch them
    this.props.state.setCountries(response.countries);
  }

  validateForm() {
    if (!this.state.name) {
      this.setState({ validationName: 'error' });
      return false;
    }
    else {
      this.setState({ validationName: null });
      return true;
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleChangeType = event => {
    this.setState({
      isSupplier: event.target.checked
    });
  }

  handleChangeCountry = event => {
    console.log('event.target.value: ', event.target.value);
    this.setState({
      countryId: event.target.value
    });
  }

  handleChangeIsCustomer = event => {
    this.setState({
      isCustomer: event.target.checked
    });
  }

  handleChangeIsSupplier = event => {
    this.setState({
      isSupplier: event.target.checked
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (!this.validateForm()) { return; }

    const action = this.props.match.params.from === 'new' ? 'POST' : 'PUT';

    this.setState({ isLoading: true });

    let contact = {
      countryId: this.state.countryId,
      isCustomer: this.state.isCustomer,
      isSupplier: this.state.isSupplier,
      name: this.state.name,
      organizationId: this.state.organizationId,
      phone: this.state.phone,
      type: this.state.type
    }

    // If the contact is a company, add the registration number before submitting
    if (contact.type === 'company') {
      contact = {
        ...contact,
        registrationNo: this.state.registrationNo
      }
    }
    
    if (action === 'POST') {
      const response = await HttpRequest(action, '/contacts', { contact });
      if (response.contacts && response.contacts[0]) {
        this.props.state.addContact(response.contacts[0]);
      }
    }
    else if (action === 'PUT') {
      const response = await HttpRequest(action, `/contacts/${this.state.contactId}`, { contact });
      if (response.contacts && response.contacts[0]) {
        this.props.state.updateContact(response.contacts[0]);
      }
    }

    this.setState({ isLoading: false });
    this.props.history.push('/');
  }



  render() {
    if (this.state.isLoading) { return this.renderLoading(); }
    return this.renderForm();
  }

  renderLoading() {
    return (
      <div className="Contact__loading">
        <LoadingIndicator />
      </div>
    )
  }

  renderForm() {
    return (
      <div className="Contact__main">
        <form onSubmit={this.handleSubmit}>
          <Grid>
            <Row className="show-grid">
            {/* BACK BUTTON */}
              <Col xs={12}>
                <Link to="/" className="Contact__back">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
              </Col>
            </Row>

            <Row>
              {/* PAGE TITLE */}
              <Col xs={12}>
                <div className="Contact__page-title">
                  <h1>{this.state.pageTitle}</h1>
                </div>
              </Col>
            </Row>

            <Row>
              {/* COMPANY / PERSON SELECTION */}
              <Col xs={12}>
                <FormGroup>
                  <Radio
                    checked={this.state.type === 'company' ? true : false}
                    value="company"
                    onChange={this.handleChange}
                    name="type" id="type" inline>
                    Company
                  </Radio>
                  <Radio
                  checked={this.state.type === 'person' ? true : false}
                    value="person"
                    onChange={this.handleChange}
                    name="type"
                    id="type" inline >
                    Person
                  </Radio>
                </FormGroup>
              </Col>
            </Row>
            
            <Row>
              {/* NAME */}
              <Col xs={12} md={6}>
                <FormGroup controlId="name" bsSize="large" validationState={this.state.validationName}>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    value={this.state.name}
                    onChange={this.handleChange}
                    type="text"
                  />
                  {this.state.validationName === 'error' && <HelpBlock>Please provide a name.</HelpBlock>}
                </FormGroup>

                {/* REGISTRATION NUMBER (IF COMPANY) */}
                { this.state.type === 'company' &&
                  <FormGroup controlId="registrationNo" bsSize="large">
                    <ControlLabel>Registration Number</ControlLabel>
                    <FormControl
                      value={this.state.registrationNo}
                      onChange={this.handleChange}
                      type="number"
                    />
                  </FormGroup>
                }

                {/* PHONE */}
                <FormGroup controlId="phone" bsSize="large">
                  <ControlLabel>phone</ControlLabel>
                  <FormControl
                    value={this.state.phone}
                    onChange={this.handleChange}
                    type="number"
                  />
                </FormGroup>
              </Col>

              {/* COUNTRY */}
              <Col xs={12} md={6}>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select Country</ControlLabel>
                  <FormControl
                    bsSize="large"
                    componentClass="select"
                    placeholder="Select a country"
                    value={this.state.countryId} 
                    onChange={this.handleChangeCountry}>
                    {this.state.countries.map(country => {
                      return <option key={country.id} value={country.id}>{country.name}</option>
                    })}
                  </FormControl>
                </FormGroup>

                {/* CUSTOMER-SUPPLIER OPTIONS */}
                <FormGroup>
                  <Checkbox checked={this.state.isCustomer} onChange={this.handleChangeIsCustomer}>Customer</Checkbox> 
                  <Checkbox checked={this.state.isSupplier} onChange={this.handleChangeIsSupplier}>Supplier</Checkbox> 
                </FormGroup>
              </Col>
            </Row>

            <Row>
            <Col cs={12} md={12}>
            <Button type="submit" bsStyle="success">Submit</Button>
            </Col>
          </Row>
          </Grid>
        </form>
      </div>
    );
  }

}

export default withRouter(withState(Contact));