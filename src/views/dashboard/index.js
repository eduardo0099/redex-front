import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import CrimsonChartCard from "../../components/CrimsonChartCard";

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
const SimpleBarChart = (
    	<BarChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="pv" fill="#8884d8" />
       <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    );


class Dashboard extends Component {
    
  render() {

    const colStyle = { 'padding':'15px 15px'};
    const middleHeight= { 'height' : '35vh' };

    return (
      <Layout>
        <TheHeader>
          <h1> Dashboard </h1>
        </TheHeader>
        <TheContent>
          <Row>
            <Col span={12} style={colStyle}>
              <CrimsonChartCard style={{...middleHeight}}>
              {SimpleBarChart}
              </CrimsonChartCard>
            </Col>
            <Col span={12} style={colStyle}>
              <CrimsonChartCard style={{...middleHeight}} />
            </Col>
          </Row>
          <Row style={colStyle}> 
            <CrimsonChartCard style={{...middleHeight}} />
          </Row>
        </TheContent>
      </Layout>
    );
  }
}

export default Dashboard;
