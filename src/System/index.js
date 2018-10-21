import React, { Component } from 'react';
import Sidebar from './Sidebar';
import { Layout } from 'antd';
const { Content } = Layout;
class System extends Component {
    
    render(){
        return (
            <Sidebar>
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                Content
                </Content>
            </Sidebar>
        )
    }
}
export default System;