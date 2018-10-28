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

  render() {
    return (
      <Layout>
        <TheHeader>
          <h2> @Oscar Cerna </h2>
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
        </TheContent>
      </Layout>
    );
  }
}
