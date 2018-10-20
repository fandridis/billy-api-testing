import React from 'react';
import { shallow } from 'enzyme';

import StateProvider from '../StateProvider';

describe('<StateProvider />', () => {
  it('should be able to set a contacts array ', () => {
    const renderedComponent = shallow(<StateProvider />); 
    renderedComponent.instance().setContacts([{ id: 1, name: "A" }, { id: 2, name: "B" }]);

    expect(renderedComponent.state().contacts.length).toEqual(2);
  });

  it('should be able to add a contact', () => {
    const renderedComponent = shallow(<StateProvider />); 
    renderedComponent.instance().addContact([{ id: 1, name: "A" }]);

    expect(renderedComponent.state().contacts.length).toEqual(1);
  });

  it('should be able to update a contact', () => {
    const renderedComponent = shallow(<StateProvider />); 
    renderedComponent.state().contacts = [{ id: 1, name: "A" }, { id: 2, name: "B" }];
    renderedComponent.instance().updateContact({ id: 2, name: 'newName' });

    expect(renderedComponent.state().contacts[1].name).toEqual('newName');
  });

  it('should be able to remove a contact', () => {
    const renderedComponent = shallow(<StateProvider />); 
    renderedComponent.state().contacts = [{ id: 1, name: "A" }, { id: 2, name: "B" }];
    renderedComponent.instance().removeContact(2);

    expect(renderedComponent.state().contacts.length).toEqual(1);
  });

  // TODO: Similar tests for countries

});