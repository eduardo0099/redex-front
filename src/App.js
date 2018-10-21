import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.scss';

class App extends Component {

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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Hola mundo
            <p>Esto va en azul</p>
          </p>
          <div>
            <p>
            Esto va en verde
          </p>
          </div>

          <div>
            <h5> @Oscar Cerna </h5>
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
            <button onClick={this.subirVuelos}> Subir vuelos </button>
          </div>
          </div>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
