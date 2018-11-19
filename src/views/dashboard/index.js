import React, { Component } from "react";
import { Layout, Row, Col, Divider,Select,DatePicker,Button } from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import CrimsonChartCard from "../../components/CrimsonChartCard";
import API from "../../Services/Api";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,AreaChart, Area,ComposedChart, Line} from 'recharts';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

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

  constructor(props){
    super(props);
    this.state={
      oficinas:[],
      fechaInicio:"",
      fechaFin:"",
      idOf:"",
      fechaInicioV:"2018-01-01",
      fechaFinV:"2018-12-31",
      vuelos:[]
    }
  }

  componentDidMount(){
    API.get('/dashboard/paquetesXvuelosXfecha', {
      params: {
        inicio: this.state.fechaInicioV,
        fin: this.state.fechaFinV 
    }}).then(response => {
      this.setState({
        vuelos:response.data
      })
    })
  }

  choose = values =>{
    this.setState({
      ...this.values,
      fechaInicio: values[0],
      fechaFin: values[1]}
    )
  };
  choose2 = values =>{
    this.setState({
      ...this.values,
      fechaInicioV: values[0],
      fechaFinV: values[1]}
    )
  };

  dataGrafVuelos =() =>{
    let data = {
      inicio: this.state.fechaInicioV.format('YYYY-MM-DD'),
      fin: this.state.fechaFinV.format('YYYY-MM-DD')
    }
    console.log("Fechas vuelos:",data);
    API.get('/dashboard/paquetesXvuelosXfecha', {params: {inicio: data.inicio, fin: data.fin }})
    .then(response => {
      console.log("Vuelos:",response.data);
      console.dir(response);
      this.setState({
        vuelos:response.data
      })
    })
  }

  dataGrafPais=()=>{
    let data = {idOf:this.state.idOf,fecha_ini: this.state.fechaInicio.format('DD/MM/YYYY'),
    fecha_fin: this.state.fechaFin.format('DD/MM/YYYY')}
    console.log("Envia:",data);
    API.post(`dashboard/paquetesXoficinaXfecha_linea`,data).then(response=>{
      console.log("Devuelve api:",response.data);
    }).catch()
  }

  fetchOficinasOrigen = q => {
    API.get("oficinas/search", { params: { q: q } }).then(response => {
      this.setState({ ...this.state, oficinas: response.data });
    });
  };

  cambiaPais = (id) =>{
    console.log("id pais:",id);
    this.setState({
      idOf:id.key
    })
  }
    
  render() {
    const SimpleBarChart = (
    	<BarChart width={450} height={190} data={this.state.vuelos}
      margin={{top:0, right: 0, left:-20, bottom: 0}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="vuelo"/>
       <YAxis/>
       <Tooltip />
       <Legend />
       <Bar dataKey="cantidad" fill="#82ca9d" />
      </BarChart>
    );

    const colStyle = { 'padding':'15px 15px'};
    const middleHeight= { 'height' : '35vh' };
    console.log(this.state.idOf,this.state.fechaInicio,this.state.fechaFin);
    return (
      <Layout>
        <TheHeader>
          <h1> Dashboard </h1>
        </TheHeader>
        <TheContent>
          <Row>
            <Col span={12} style={colStyle}>
              <Divider >Vuelos mas usuados</Divider>
              <Col span={12}>
              <RangePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              onChange={this.choose2}
              />
              </Col>
              <Button onClick={this.dataGrafVuelos}>MOSTRAR</Button>
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
            <Divider >Resumen por oficina</Divider>
            <Select
              style={{ width: "100%" }}
              showSearch
              defaultActiveFirstOption={false}
              filterOption={false}
              onSearch={this.fetchOficinasOrigen}
              notFoundContent={null}
              labelInValue={true}
              onChange={this.cambiaPais}
              >
              {this.state.oficinas.map(i => (
                <Option key={i.id} value={i.id}>
                {i.pais.nombre}
                </Option>
              ))}
            </Select>
            <RangePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              onChange={this.choose}
            />
            <Button onClick={this.dataGrafPais}>MOSTRAR</Button>
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
