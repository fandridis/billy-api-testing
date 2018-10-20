/**
 * A High Order Component to easier manage the loading indicator.
 * By wrapping a component with WithLoading and passing the isLoading flag,
 * the HOC will render either the real component or the indicator component
 * depnding on the flag.
 */

import React from 'react';
import LoadingIndicator from '../components/LoadingIndicator';

const WithLoading = (Component) => {
  return function WihLoadingComponent({ isLoading, indicatorType = 'default', ...props }) {
    if (!isLoading) return (<Component {...props} />);

    if (indicatorType === 'default') {
      return (<p>Loading...</p>)
    }
    else if (indicatorType === 'squares') {
      return <LoadingIndicator />;
    }
  }
}
export default WithLoading;
