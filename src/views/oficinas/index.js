import React, { Component } from 'react';
import { Row, Col, Layout, Button } from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import OficinasList from './OficinasList';
import OficinasModal from './OficinasModal';

export default class Oficinas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
        <Layout>
          <TheHeader>
            <Col span={12}>
              <h2> Oficinas </h2>
            </Col>
            <Col span={12} align="right">
              <Button type="primary"> Nuevo </Button>
            </Col>
          </TheHeader>
          <TheContent>
              <OficinasList/>
          </TheContent>
        </Layout>
    )
  }
}
