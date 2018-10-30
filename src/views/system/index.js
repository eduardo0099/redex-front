import React, { Component } from "react";
import { Layout } from "antd";
import { TheContent, TheHeader } from "../../components/layout";
import API from "../../Services/Api";

export default class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archivo: {}
    };
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
        </TheContent>
      </Layout>
    );
  }
}
