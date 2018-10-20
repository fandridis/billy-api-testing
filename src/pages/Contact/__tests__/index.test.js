import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import StateProvider from '../../../providers/StateProvider';
import Contact from '../index';

describe('<Contact />', () => {
  it('should render a form', () => {
    const renderedComponent = mount(
      <MemoryRouter>
        <StateProvider>
          <Contact />
        </StateProvider>
      </MemoryRouter>
    );
    setTimeout(() => {
      expect(renderedComponent.find('form').length).toBe(1);
    }, 2000);
  });

});