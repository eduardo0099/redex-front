import React from "react";
import API from "../../Services/Api";
import { Table, Input, Col, Row } from "antd";

const Search = Input.Search;

export default class CrimsonTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        current: 1,
        pageSize: 8,
        total: 0,
        onChange: this.handlePageChange
      },
      search: "",
      loading: false,
      list: []
    };
  }

  handlePageChange = (page, size) => {
    this.setState(
      {
        ...this.state,
        pagination: {
          ...this.state.pagination,
          current: page
        }
      },
      () => this.fetch()
    );
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      pageSize: this.props.pageSize ? this.props.pageSize : 2
    });
    this.fetch();
  }

  fetch() {
    let request = {
      current: this.state.pagination.current - 1,
      pageSize: this.state.pagination.pageSize,
      search: this.state.search
    };

    this.setState({ ...this.state, loading: true }, () => {
      API.get(this.props.url, { params: request }).then(response => {
        this.setState({
          ...this.state,
          list: response.data.data,
          loading: false,
          pagination: {
            ...this.state.pagination,
            pageSize: this.props.pageSize,
            total: response.data.total
          }
        });
      });
    });
  }

  handleSearch = search => {
    this.setState(
      {
        ...this.state,
        search: search,
        pagination: { ...this.state.pagination, current: 1 }
      },
      () => {
        this.fetch();
      }
    );
  };

  render() {
    return (
      <div>
        <Row style={{marginBottom: '20px'}}>
          <Col span={6}>
            <Search
              placeholder="Buscar"
              onSearch={this.handleSearch}
              enterButton
            />
          </Col>
        </Row>
        <Table
          dataSource={this.state.list}
          loading={this.state.loading}
          pagination={this.state.pagination}
          rowKey="id"
        >
          {this.props.children}
        </Table>
      </div>
    );
  }
}

CrimsonTable.defaultProps = {
  pageSize : 8
}
