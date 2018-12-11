import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import routes from "../../routes";

const { Sider } = Layout;

export default class SidebarLayout extends React.Component {

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('datasession');
    this.props.route.history.push('/');
  }
  render() {
    let index = "1";

    const currentPath = this.props.route.match.path;

    const ds = JSON.parse(localStorage.getItem('datasession'));
    const authorizedRoutes = routes.filter(route => (!route.roles || route.roles.includes(ds.rol.codigo.name)) && (route.hidden=== undefined || !route.hidden) );

    authorizedRoutes.forEach((route, i) => {
      if (currentPath.includes(route.path)) {
        index = i.toString();
      }
    });

    const Component = this.props.component;
    const route = this.props.route;
    
    return (
      <div>
        <Layout>
          <Sider breakpoint="lg" collapsedWidth="80">
            <div className="logo" />
            <div>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[index]}>
              {authorizedRoutes.map((route, key) => {
                const { path, name } = route;
                return (
                  <Menu.Item key={key}>
                    <Link to={path}> {name} </Link>
                  </Menu.Item>
                );
              })}
              <Menu.Item key="logout" onClick={this.logout}>
                Cerrar sesión
              </Menu.Item>
            </Menu>
          </Sider>
          <Component route={route} />
        </Layout>
      </div>
    );
  }
}
