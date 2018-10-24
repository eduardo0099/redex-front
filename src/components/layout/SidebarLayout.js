import  React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import routes from '../../routes';

const { Sider } = Layout;

export default class SidebarLayout extends React.Component {

  render() {
    let index = '1';
    const currentPath = this.props.route.match.path;
    routes.forEach((route, i) => {
      if(currentPath.includes(route.path)){
        index = i.toString();
      }
    });

    const Component = this.props.component;
    const route = this.props.route;
    return (
      <div>
        <Layout>
          <Sider breakpoint="lg" collapsedWidth="80">
            <div className="logo"/>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[index]}>
            { routes.map((route, key) => {
            const { path, name } = route;
            return (
              <Menu.Item key={key}>
                <Link to={path}> { name } </Link>
              </Menu.Item>
            )
          })}
            </Menu>
          </Sider>
          <Component route={route}/>
        </Layout>
      </div>
   );
}
}
