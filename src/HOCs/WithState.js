/**
 * A High Order Component to make the state object available to other components.
 * By wrapping a component with WithState, it can access the state context from its props.
 */

import React from 'react';
import { StateContext } from '../providers/StateProvider';

export function withState(Component) {
  return function StatefullComponent(props) {
    return (
      <StateContext.Consumer>
        {state => <Component {...props} state={state} />}
      </StateContext.Consumer>
    );
  };
}