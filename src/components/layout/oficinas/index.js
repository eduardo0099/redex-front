import React, { Component } from 'react';
import { Layout } from 'antd';

const Header = Layout.Header;
const Content = Layout.Content;

export default class Oficinas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Header style={{ background: '#fff', padding: 0  }}>
          <h2> Oficinas </h2>
        </Header>
        <Content>
            <div>
              <span> adssa </span>
            </div>
        </Content>
      </div>
    )
  }
}
