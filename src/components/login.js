import React, {Component} from 'react';
import { Col, Button, Form, Input, Container, FormGroup } from 'reactstrap';
import axios from 'axios';
import _ from 'lodash';

const LOGIN_API = "https://tk-lms.herokuapp.com/api/auth";



 class Login extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      loggingIn: false,
      loggedIn: null,
      username: "",
      password: ""
    
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      loggingIn: true
    });
    axios.post(LOGIN_API, {
      username: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      localStorage.token = response.data.token;
      this.setState({
        loggingIn: false,
        username: "",
        password: "",
        loggedIn: true,
      });
    })
    .catch((error) => {
      if (error.response.data.success == 0) {
        this.setState({
          loggingIn: false,
          username: "",
          password: "",
          loggedIn: false,
        });
      };
    });
  }

  

  onUsernameChange = event => {
    this.setState({
      username: event.target.value,
    });
  }

  onPasswordChange = event => {
    this.setState({
      password: event.target.value

    });
  }

   logOut = event => {
    localStorage.removeItem("token");
    this.setState({
      loggedIn: null
    });
  }


  render() {
    if (localStorage.getItem("token") != null) {
      return this.renderApp();
    } else {
      return (this.authUser(), this.renderLoginForm()
    );
    }
  }

   authUser() {
     if (this.state.loggedIn == false && this.state.loggingIn == false) {
       document.getElementById("err").textContent = "wrong username or password";
   } else if (this.state.loggingIn == true) {
     document.getElementById("err").textContent = "logging in...";

   }

  }


   renderApp() {
     return (
       <div>
         <div> welcome back </div>
         <Button onClick={this.logOut}>sign out</Button>
       </div>
     );
   }

  

  renderLoginForm() {
    return (
      <div className="login-page"> 
        <div className="form">
        <Form className="login-form" onSubmit={this.onSubmit}>
          <FormGroup> 
            <Input placeholder="username" value={this.state.username}
              onChange={this.onUsernameChange}
             required />
          </FormGroup>
          <FormGroup>
            <Input placeholder="password" value={this.state.password} 
              onChange={this.onPasswordChange} 
            type='password' 
            required/>
          </FormGroup>
          <p id="err" className="text-secondary" onSubmit={this.authUser}></p>  
          <FormGroup>
            <Button > sign in </Button>
          </FormGroup>
        </Form>
        </div>
      </div> 
    )
  }

}
export default Login;