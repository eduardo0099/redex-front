import React, { Component } from "react";
import { Layout, Row, Col, Divider } from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import CrimsonChartCard from "../../components/CrimsonChartCard";

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,AreaChart, Area,ComposedChart, Line} from 'recharts';

const data = [
      {name: 'Enero', paquetes: 400, amt: 2400},
      {name: 'Febrero', paquetes: 300, amt: 2210},
      {name: 'Marzo', paquetes: 200, amt: 2290},
      {name: 'Abril', paquetes: 278, amt: 2000},
      {name: 'Mayo', paquetes: 189, amt: 2181},
      {name: 'Junio', paquetes: 239, amt: 2500},
      {name: 'Julio', paquetes: 239, amt: 2500},
      {name: 'Agosto', paquetes: 349, amt: 2100},
      {name: 'Setiembre', paquetes: 349, amt: 2100},
      {name: 'Octubre', paquetes: 10, amt: 2100},
      {name: 'Noviembre', paquetes: 349, amt: 2100},
      {name: 'Diciembre', paquetes: 0, amt: 2100},
];

const vuelos=[
  {name: 'Peru-Francia', paquetes: 400},
  {name: 'Chile-Brasil', paquetes: 300},
  {name: 'Francia-Lima', paquetes: 250},
  {name: 'Rusia-España', paquetes: 400},
  {name: 'Grecia-Italia', paquetes: 400}
  
];

const oficinas=[
  {name:'Peru',registrados:250,entregados:100},
  {name:'Chile',registrados:150,entregados:50},
  {name:'Brasil',registrados:350,entregados:100},
  {name:'Bolivia',registrados:170,entregados:160},
  {name:'Rusia',registrados:60,entregados:140},
  {name:'España',registrados:123,entregados:90}
];
const SimpleBarChart = (
    	<BarChart width={450} height={190} data={data}
      margin={{top:0, right: 0, left:-20, bottom: 0}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="paquetes" fill="#82ca9d" />
      </BarChart>
    );

const SimpleAreaChart = (
  <AreaChart width={450} height={190} data={vuelos}
            margin={{top: 0, right: 0, left: -20, bottom: 0}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Area type='monotone' dataKey='paquetes' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
);

const LineaBarComposeChart = (
  <ComposedChart width={600} height={190} data={oficinas}
            margin={{top: 0, right: 0, bottom: 0, left: 200}}>
          <CartesianGrid stroke='#f5f5f5'/>
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='registrados' barSize={20} fill='#413ea0' />
          <Line type='monotone' dataKey='entregados' stroke='#ff7300' />
       </ComposedChart>
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
              <Divider >paquetesXoficina</Divider>
              <CrimsonChartCard style={{...middleHeight}}>
              {SimpleBarChart}
              </CrimsonChartCard>
            </Col>
            <Col span={12} style={colStyle}>
              <Divider >vuelosXpaquetes(vuelos mas usuados?)</Divider>
              <CrimsonChartCard style={{...middleHeight}} >
              {SimpleAreaChart}
              </CrimsonChartCard>
            </Col>
          </Row>
          <Row style={colStyle}> 
            <Divider >paquetesXTodasOficina(oficinas con mas transito, ultimos meses?)</Divider>
            <CrimsonChartCard style={{...middleHeight}} >
            {LineaBarComposeChart}
            </CrimsonChartCard>
          </Row>
        </TheContent>
      </Layout>
    );
  }
}

export default Dashboard;
