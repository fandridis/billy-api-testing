import React, { Component } from 'react';
import './App.css';

// ===== APP ROUTES ===== //
import Routes from "./routes/Routes";

// ===== STATE MANAGEMENT WITH REACT 16 CONTEXT API ===== //
import StateProvider from './providers/StateProvider';

class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {};
  }

  async componentDidMount() {
    console.log('*** componentDidMount @ App.js ***');
  }


  render() {
    const childProps = {};

    return (
      <StateProvider>
        <Routes childProps={childProps}/>
      </StateProvider>
    );
  }

}

export default App;
