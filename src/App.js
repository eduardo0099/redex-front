import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Public/Login';
import routes from './routes';
import { SidebarLayout } from './components/layout';

class App extends Component {

    render() {
      const ds = JSON.parse(localStorage.getItem('datasession'));

      let authorizedRoutes = [];

      if(ds){
        authorizedRoutes = routes.filter(route => !route.roles || route.roles.includes(ds.rol.codigo.name));
      }

    return (
    
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          { authorizedRoutes.map((route, key) => {
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
