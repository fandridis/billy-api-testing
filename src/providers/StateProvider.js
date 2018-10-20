/**
 * Provides a common context that can be accessed from all components
 * no matter their position in the component tree.
 */

import React from 'react';

export const StateContext = React.createContext();

class StateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 'test from state',
      numTest: 0,
      changeNumTest: (newNum) => { this.setState({ numTest: newNum }); },

      contacts: [],
      setContacts: this.setContacts,
      addContact: this.addContact,
      removeContact: this.removeContact,

      countries: [],
      setCountries: this.setCountries
    };
  }

  setContacts = contacts => this.setState({ contacts });
  addContact = contact => {
    const newContacts = [...this.state.contacts, contact];
    this.setState({ contacts: newContacts });
  };

  removeContact = contactId => {
    const newContacts = this.state.contacts.filter(contact => contact.id !== contactId);
    this.setState({ contacts: newContacts });
  }

  setCountries = countries => this.setState({ countries });
  
  render() {
    return (
      <StateContext.Provider value={this.state}>
        {this.props.children}
      </StateContext.Provider>
    );
  }
}

export default StateProvider;
