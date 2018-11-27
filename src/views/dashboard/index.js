import React, { Component } from "react";
import { Layout, Row, Col, Divider,Select,DatePicker,Button } from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import CrimsonChartCard from "../../components/CrimsonChartCard";
import API from "../../Services/Api";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,AreaChart, Area,ComposedChart, Line} from 'recharts';
import notify from '../../utils/notify';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

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
      fechaInicioO:"01-01-2018",
      fechaFinO:"31-12-2018",
      vuelos:[],
      oficinas:[],
      oficina:[],
      btnPaises:true,
      btnVuelos:true,
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
    });
    let data = {
      fecha_ini:this.state.fechaInicioO,
      fecha_fin:this.state.fechaFinO
    }
    API.post(`/dashboard/paquetesXoficinasXfecha_barra`,data).then(response=>{
      console.log("Oficinas:",response.data)
      this.setState({...this.state,
        oficinas:response.data
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
      fechaFinV: values[1],
      btnVuelos:false
    }
    )
  };

  chooseFechaOficinas = values =>{
    this.setState({
      ...this.values,
      fechaInicioO:values[0],
      fechaFinO:values[1],
      btnPaises:false
    })
  }

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
      }).catch((eror)=>{
        notify.error({
          message: "No se pudo dibujar la grafica"
        })
      })
    })
  }

  dataGrafOficinas =()=>{
    let data = {
      fecha_ini:this.state.fechaInicioO.format('DD-MM-YYYY'),
      fecha_fin:this.state.fechaFinO.format('DD-MM-YYYY')
    }
    console.log("Fechas oficinas:",data);
    API.post(`/dashboard/paquetesXoficinasXfecha_barra`,data).then(response=>{
      console.log("Oficinas:",response.data)
      this.setState({...this.state,
        oficinas:response.data
      }).catch((eror)=>{
        notify.error({
          message: "No se pudo dibujar la grafica"
        })
      })
    })
  }

  dataGrafPais=()=>{
    let data = {idOf:this.state.idOf,fecha_ini: this.state.fechaInicio.format('DD/MM/YYYY'),
    fecha_fin: this.state.fechaFin.format('DD/MM/YYYY')}
    console.log("Envia:",data);
    API.post(`dashboard/paquetesXoficinaXfecha_linea`,data).then(response=>{
      console.log("Devuelve api:",response.data);
      this.setState({...this.state,oficina:response.data})
    }).catch((eror)=>{
      notify.error({
        message: "No se pudo dibujar la grafica"
      })
    })
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
       <Bar dataKey="capacidad" fill="#82ca9d" />
      </BarChart>
    );

    const SimpleAreaChart = (
      <AreaChart width={450} height={190} data={this.state.oficinas}
                margin={{top: 0, right: 0, left: -20, bottom: 0}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="pais"/>
            <YAxis/>
            <Tooltip/>
            <Area type='monotone' dataKey='cantidad' stroke='#8884d8' fill='#8884d8' />
          </AreaChart>
    );
    
    const LineaBarComposeChart = (
    <ComposedChart width={600} height={190} data={this.state.oficina}
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
              <Divider >Vuelos mas usados</Divider>
              <Row style={colStyle}>
                <Col span={12}>
                <RangePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                onChange={this.choose2}/></Col>
                <Col span={12}><Button onClick={this.dataGrafVuelos} disabled={this.state.btnVuelos}>MOSTRAR</Button></Col>
              </Row>
              <CrimsonChartCard style={{...middleHeight}}>
              {SimpleBarChart}
              </CrimsonChartCard>
            </Col>
            <Col span={12} style={colStyle}>
              <Divider >Resumen Oficinas</Divider>
              <Row style={colStyle}>
                <Col span={12}><RangePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                onChange={this.chooseFechaOficinas}
                /></Col>
                <Col span={12}><Button onClick={this.dataGrafOficinas} disabled={this.state.btnPaises}>MOSTRAR</Button></Col>
              </Row>
              <CrimsonChartCard style={{...middleHeight}} >
              {SimpleAreaChart}
              </CrimsonChartCard>
            </Col>
          </Row>
        </TheContent>
      </Layout>
    );
  }
}

export default Dashboard;
