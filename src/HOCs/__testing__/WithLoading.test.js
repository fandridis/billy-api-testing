import React from 'react';
import { shallow } from 'enzyme';

import WithLoading from '../WithLoading';

const Component = () => {
  return <p>Real component</p>
}
const ComponentWithLoading = WithLoading(Component);

describe('<WithLoading />', () => {
  it('should render "Loading..." if isloading and indicatorType === "default"', () => {
    const renderedComponent = shallow(<ComponentWithLoading isLoading={true} />);

    expect(renderedComponent.html()).toBe('<p>Loading...</p>');
  });

  it('should render the IndicatorComponent if isloading and indicatorType === "squares"', () => {
    const renderedComponent = shallow(<ComponentWithLoading isLoading={true} indicatorType="squares" />);
    const includeLoadingIndicator = renderedComponent.html().includes('<div class="sk-folding-cube');

    expect(includeLoadingIndicator === true);
  });

  it('should render the real component if !isloading', () => {
    const renderedComponent = shallow(<ComponentWithLoading isLoading={false} />);

    expect(renderedComponent.html()).toBe('<p>Real component</p>');
  });

});

