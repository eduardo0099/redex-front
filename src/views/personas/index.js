import React from 'react';
import { Col, Layout } from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import PersonasList from './PersonasList';

export default class Personas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modalVisible: false
        }
      }
    
    
      render() {
        return (
          <Layout>
              <TheHeader>
                <Col span={12}>
                  <h1> Personas </h1>
                </Col>
              </TheHeader>
              <TheContent>
              <PersonasList/>
                  
              </TheContent>
            </Layout>
        )
      }

} 