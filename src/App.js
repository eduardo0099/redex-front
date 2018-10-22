import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Public/Login';
//import PrivateRoute from './utils/PrivateRoute';
import routes from './routes';
import { SidebarLayout } from './components/layout';
import _ from 'lodash';

class App extends Component {

  constructor(props) {
      super(props);
    }

    render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          { routes.map((route, key) => {
            const { component, path } = route;
            return (
              <Route exact path={path} key={key}
                render={ (route) => <SidebarLayout component={component} route={route} /> }/>
            )
          })}
        </Switch>
      </BrowserRouter>
    )
}
}

export default App;
