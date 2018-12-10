import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import API, { getFile } from "../../Services/Api";

class ModalReporte extends Component {
    constructor(props) {
        super(props);
        
    }
    handleExport = () => {
        API.post(`simulacion/reporte`,this.props.info,{responseType:"arraybuffer"})
            .then(response => {
                getFile(response);
            })
    }
    render() {
        /*let info = {
            fechaInicial: 121312312,
            duracionTotal: 1200000000,
            almacenColapso: "SKBO", //ok
            cantidadAumento: 223, //ok
            paquetesEnviados: 12121, //ok
            oficinas: [
                {
                    codigo: "SKBO",
                    cantidad: 121212
                },
                {
                    codigo: "SPIM",
                    cantidad: 2
                },
            ] 
        }
*/
        let info = this.props.info;
        info.oficinas.sort((a,b)=>{
            return b.cantidad - a.cantidad
        })
        let fechaInicio = new Date(info.fechaInicial)
        let fechaFin = new Date(info.fechaInicial + info.duracionTotal)
        let auxDias = 24*60*60*1000;
        let dias = Math.floor(info.duracionTotal / auxDias);
        let horas = (info.duracionTotal % auxDias) / (60*60*1000)

        return (
            <div >
                <Modal
                    title="El sistema ha colapsado"
                    visible={true}
                    onOk={this.props.onHandleClose}
                    onCancel={this.props.onHandleClose}
                >
                    <div style={{textAlign:'center'}}>
                        <h1 style={{marginBottom:'0',fontWeight:'bold'}}>RESULTADOS</h1>
                        <h3>Sobrecarga en el almacen {info.almacenColapso}</h3>
                    </div>
                    <hr/>
                    <table style={{width:'100%'}}>
                        <tbody>
                            <tr>
                                <td>Fecha inicio: {fechaInicio.toLocaleString('en-GB', { timeZone: 'UTC' })}</td>
                                <td>Fecha fin: {fechaFin.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Duración: {dias} días y {horas.toFixed(1)} horas</td>
                                <td>Paquetes enviados: {info.paquetesEnviados}</td>
                            </tr>
                            <tr>
                                <td>Almacen: {info.almacenColapso}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table> 
                    <hr/> 
                    <div style={{textAlign:'center'}}>
                        Se recomienda incrementar a {info.cantidadAumento} la capacidad del almacen {info.almacenColapso}
                    </div>  
                    <hr/>  
                    <div>
                        <h3>Lista de almacenes más concurridos</h3>
                    </div>
                    <table>
                        <tbody>
                            {info.oficinas.slice(0,5).map( (obj, idx) => {
                                return (<tr key={idx}>
                                    <td>{idx+1}) {obj.codigo} - {obj.cantidad}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>  
                    <Button type="primary" style={{textAlign:'center'}} onClick={this.handleExport}> Exportar</Button>             
                </Modal>
            </div>
        );
    }
}

export default ModalReporte;