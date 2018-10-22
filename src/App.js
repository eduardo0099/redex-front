import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Public/Login';
import PrivateRoute from './Utils/PrivateRoute';
import System from './System';
class App extends Component {

  constructor(props) {
      super(props);
    }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Login}></Route>
          <PrivateRoute path="/system" exact component={System}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
