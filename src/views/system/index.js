import React, { Component } from 'react';
import { Layout } from 'antd';
import { TheContent, TheHeader } from '../../components/layout';

import axios from 'axios';

export default class System extends Component {

  constructor(props) {
      super(props);
      this.state ={
        archivo: {}
      }
  }

  onChange = (e) => {
      let file =  e.target.files[0];
      let formData = new FormData();
      formData.append('file', file);
      axios({
        method: 'POST',
        url: 'http://localhost:5000/archivos/upload', crossDomain: true, data: formData
      })
      .then(response => {
        this.setState({...this.state, archivo: response.data});
      })
  }

  subirOficinas = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:5000/oficinas/carga', crossDomain: true, data: this.state.archivo
    })
  }

  subirVuelos = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:5000/vuelos/carga', crossDomain: true, data: this.state.archivo
    })
  }

  subirUsuarios = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:5000/usuarios/carga', crossDomain: true, data: this.state.archivo
    })
  }

  render(){
    return (
      <Layout>
        <TheHeader>
          <h2> @Oscar Cerna </h2>
        </TheHeader>
        <TheContent>
          <input type="file" onChange={this.onChange}/>
          <div>
            <span> id: { this.state.archivo.id } </span>
          </div>
          <div>
            <span> nombre_original: { this.state.archivo.nombreOriginal } </span>
          </div>
          <div>
            <span> nombre_servidor: { this.state.archivo.nombreServidor } </span>
          </div>
          <div>
            <button onClick={this.subirOficinas}> Subir oficinas </button>
          </div>
          <div>
            <button onClick={this.subirUsuarios}> Subir usuarios </button>
          </div>
          <div>
          <button onClick={this.subirVuelos}> Subir vuelos </button>
        </div>
        </TheContent>
      </Layout>
    )
  }
}
