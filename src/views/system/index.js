import React, { Component } from "react";
import { Layout, Button ,Divider,DatePicker} from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import moment from 'moment';
import API from "../../Services/Api";



function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
}
function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

export default class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archivo: {},
      inicio:"",
      fin:"",
      
    };
    this.fechaFin = this.fechaFin.bind(this);
    this.fechaInicio = this.fechaInicio.bind(this);
  }

  onChange = e => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    this.setState({ ...this.state, archivo: formData });
  };

  subirOficinas = () => {
    API.post('/oficinas/carga', this.state.archivo);
  };

  subirVuelos = () => {
    API.post('/planvuelo/carga', this.state.archivo);
  };

  subirUsuarios = () => {
    API.post('/usuarios/carga', this.state.archivo);
  };

  subirPaquetes = () => {
    API.post('/paquetes/carga', this.state.archivo);
  };

  subirSimuOficinas = () => API.post('/simulaciones/1/oficinas/carga', this.state.archivo);

  subirSimuVuelos = () => API.post('/simulaciones/1/vuelos/carga', this.state.archivo);

  subirSimuPaquetes = () => API.post('/simulaciones/1/paquetes/carga', this.state.archivo);

  subirSimulador = ()=>{
    API.post('simulaciones/window',{
      params:{
        simulacion:  1, 
        inicio: this.state.inicio, 
        fin: this.state.fin
      }
    })
  }
  fechaFin(event){
    console.log(event.target.value);
    this.setState({fin: event.target.value});
  }
  fechaInicio(event){
    this.setState({inicio: event.target.value});
  }
  

  render() {
    return (
      <Layout>
        <TheHeader>
          <h1> Pruebas </h1>
        </TheHeader>
        <TheContent>
          <input type="file" onChange={this.onChange} />
          <div>
            <button onClick={this.subirOficinas}> Subir oficinas </button>
          </div>
          <div>
            <button onClick={this.subirUsuarios}> Subir usuarios </button>
          </div>
          <div>
            <button onClick={this.subirVuelos}> Subir vuelos </button>
          </div>
          <div>
            <button onClick={this.subirPaquetes}> Subir paquetes </button>
          </div>
          <div>
            <button onClick={this.subirSimuOficinas}> Subir simu oficinas </button>
          </div>
          <div>
            <button onClick={this.subirSimuVuelos}> Subir simu vuelos </button>
          </div>
          <div>
            <button onClick={this.subirSimuPaquetes}> Subir simu paquetes </button>
          </div>
          <Divider orientation="left">Simulador</Divider>
          <input value={this.state.inicio} onChange={this.fechaInicio}></input>
          <input value={this.state.fin} onChange={this.fechaFin}></input>
          <Button onClick={this.subirSimulador}>Inicio</Button>
        </TheContent>
      </Layout>
    );
  }
}
