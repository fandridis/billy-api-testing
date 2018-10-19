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
      changeNumTest: (newNum) => { this.setState({ numTest: newNum }); }
    };
  }

  render() {
    return (
      <StateContext.Provider value={this.state}>
        {this.props.children}
      </StateContext.Provider>
    );
  }
}

export default StateProvider;
