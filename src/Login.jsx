import React, { Component } from 'react';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import * as yup from 'yup'
import Form from 'react-formal';
import {addInputTypes} from 'react-formal-inputs';
import './App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.app = props.app;
    this.state = {
      email: '',
      password: '',
      error: ''
    };

  //   let defaultStr = yup.string().default('');

  //   let modelSchema = yup.object({
  //       email: defaultStr.required('please enter a first name'),
  //       password:  defaultStr.required('please enter a surname'),
  //       // name: yup.object({
  //       // }),

  //       // dateOfBirth: yup.date()
  //       //   .max(new Date(), "You can't be born in the future!"),

  //       // colorId: yup.number().nullable()
  //       //   .required('Please select a color')
  //   });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    this.app.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
      // this.setState({error: 'Hi there'})
    }).catch((error) => {
      this.setState({error: error.message})
    });
  }

  signup(e){
    e.preventDefault();
    this.app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
    }).then((u) =>{})
    .catch((error) => {
      this.setState({error: error.message})
    })
  }
  render() {
      return (
         <div className="col-md-6">
          <h2 className="label1">Login Page</h2>
           {/*let form = (*/}
            <form>
              <div className="form-group">
               <label className="label">Email address</label>

               <input value={this.state.email} onChange={this.handleChange} 
               type="email" className="form-control" name="email"
                placeholder="Enter email" />

                <label className="label">Password</label>

                <input value={this.state.password} onChange={this.handleChange} 
                type="password" name="password" className="form-control"  
                placeholder="Password" />

                {/*<Form.Message for={['email', 'password']}/>*/}
              </div>
            </form>
            <h3 className="abc">{this.state.error}</h3>

            <button type="submit" onClick={this.login} 
              className="noteButton2">Login</button>

            <button type="submit"
              onClick={this.signup}  
              className="noteButton2">Signup
            </button>
        </div>
      );
  }
}


export default Login;
