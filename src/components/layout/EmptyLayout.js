import React from "react";
import { Layout, Menu, Icon } from "antd";
const SubMenu = Menu.SubMenu;
const { Header, Sider } = Layout;

export default class EmptyLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Component = this.props.component;
    const route = this.props.route;
    return (
      <div>
        <Layout>
          <Component route={route} />
        </Layout>
      </div>
    );
  }
}
