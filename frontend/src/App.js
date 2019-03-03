import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/home/home';
import LoginPage from './pages/login/login';
import SignUpPage from './pages/signup/signup';
import LogoutPage from './pages/logout/logout';
import { Error404Page } from 'tabler-react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "tabler-react/dist/Tabler.css";

function App(props) {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route component={Error404Page} />
          </Switch>
        </Router>
    );
  }
  
  export default App;
