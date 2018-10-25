import React from "react";
import { Layout } from "antd";

const Content = Layout.Content;

export default class TheContent extends React.Component {
  render() {
    return (
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: "#fff",
          minHeight: 280
        }}
      >
        <div style={{ padding: 12, background: "#fff", textAlign: "center" }}>
          {this.props.children}
        </div>
      </Content>
    );
  }
}
