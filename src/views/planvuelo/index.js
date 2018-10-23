import React from 'react';
import { Col, Layout, Button } from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import PlanVueloList from './PlanVueloList';
import PlanVueloForm from './PlanVueloForm';

export default class PlanVuelo extends React.Component {
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
          <h1> Plan de Vuelo </h1>
        </Col>
        <Col span={12} align="right">
          <Button type="primary" onClick={this.showModal}> Cargar </Button>
        </Col>
      </TheHeader>
      <TheContent>
          <PlanVueloList/>
          <PlanVueloForm visible={this.state.modalVisible} onCancel={this.handleCancel} onCreate={this.handleCreate} wrappedComponentRef={this.saveFormRef}/>
      </TheContent>
    </Layout>
    )
  }
}
