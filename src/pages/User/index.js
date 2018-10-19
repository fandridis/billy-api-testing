import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withState } from "../../HOCs/WithState";
// import "./User.css";

class User extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  componentDidMount() {
    console.log('*** componentDidMount @ Home.js ***');
  }

  render() {
    return (
      <div className="user">
        User
        <h3><Link to="/">Home</Link></h3>
      </div>
    );
  }
}

export default withState(User);