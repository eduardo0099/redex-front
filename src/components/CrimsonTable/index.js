import React from "react";
import API from "../../Services/Api";
import { Table, Tag, Dropdown, Menu, Icon, Input, Col, Row } from "antd";

const Search = Input.Search;

export default class CrimsonTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      list: []
    };
  }

  componentDidMount(){
      this.fetch();
  }

  fetch() {
    this.setState({ ...this.state, loading: true }, () => {
      API.get(this.props.url).then(response => {
        this.setState({ ...this.state, list: response.data, loading: false });
      });
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={6}>
            <Search
              placeholder="Buscar"
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
        </Row>
        <Table
          dataSource={this.state.list}
          loading={this.state.loading}
          pagination={{ pageSize: 9 }}
          rowKey="id"
        >
          {this.props.children}
        </Table>
      </div>
    );
  }
}
