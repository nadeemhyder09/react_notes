import React, { Component } from 'react';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import Login from './Login.jsx';
import List from './List';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.app = firebase.initializeApp(DB_CONFIG);
    this.state = {
      user: {},
    }
  }

  authListener() {
    this.app.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        this.setState({user: user});
      } else {
        this.setState({user: null});
      }
    })
  }

  componentDidMount() {
    this.authListener();
  }

  render() {
    return (
      <div>
        {this.state.user ? (<List app={this.app} />) : (<Login app={this.app} />)}
      </div>
    );
  }
}

export default App;