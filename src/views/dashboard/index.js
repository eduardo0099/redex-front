import React, { Component } from 'react';
import { Layout } from 'antd';
import { TheContent, TheHeader } from '../../components/layout';

class Dashboard extends Component{
    render(){
        return(
            <Layout>
            <TheHeader>
                <h1> Dashboard </h1>
            </TheHeader>
            <TheContent>
               
            </TheContent>
          </Layout>
        );
    }
}

export default Dashboard;