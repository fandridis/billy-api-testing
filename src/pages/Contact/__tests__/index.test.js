import React from 'react';
import { mount } from 'enzyme';

import StateProvider from '../../../providers/StateProvider';
import Contact from '../index';

describe('<Contact />', () => {
  it('should render a form', () => {
    const renderedComponent = mount(
      <StateProvider>
        <Contact />
      </StateProvider>
  );
  setTimeout(() => {
    expect(renderedComponent.find('form').length).toBe(1);

  }, 2000);
  });

});