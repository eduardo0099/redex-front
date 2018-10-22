import  React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import routes from '../../routes';

const SubMenu = Menu.SubMenu;
const { Header, Sider } = Layout;

export default class SidebarLayout extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
   const Component = this.props.component;
   const route = this.props.route;
   return (
      <div>
        <Layout>
          <Sider breakpoint="lg" collapsedWidth="80">
            <div className="logo"/>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            { routes.map((route, key) => {
            const { component, path } = route;
            return (
              <Menu.Item key={key}>
                <Link to={path}> { path } </Link>
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
