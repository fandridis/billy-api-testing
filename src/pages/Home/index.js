import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withState } from "../../HOCs/WithState";
// import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  componentDidMount() {
    console.log('*** componentDidMount @ Home.js ***');
  }

  render() {
    return (
      <div className="home">
        HOME
        <h3><Link to="/user">User</Link></h3>
      </div>
    );
  }
}

export default withState(Home);