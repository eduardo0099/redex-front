import React, { Component } from 'react';
import { Layout , Modal ,Button, DatePicker, TimePicker, InputNumber, Spin } from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import { ComposableMap,ZoomableGroup,Geographies,Geography,Markers,Marker,Line,Lines} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import map from "./../../utils/files/world-50m-simplified.json";
import API from './../../Services/Api';
import moment from 'moment';
import ModalReporte from './ModalReporte';
import mathjs from 'mathjs';
var sem = require('semaphore')(1);

class Simulacion extends Component{
    constructor(props) {
        super(props);
        this.colorSelected = '#c7a602';
        this.colorCommon = '#3e3e3e';
        this.colorUnSelected = '#f5cc00';
        this.colorHover = '#607D8B';
        this.colorPressed = '#FF5722';
        this.frecRefreshSimu = 1000;
        this.percentColors = [
            { pct: 0.0, color: { r: 102, g: 210, b: 102 } },
            { pct: 0.5, color: { r: 243, g: 243, b: 86 } },
            { pct: 1.0, color: { r: 243, g: 68, b: 68 } } ];
		this.percentColorsFlights = [
            { pct: 0.0, color: { r: 0, g: 128, b: 0 } },
            { pct: 0.5, color: { r: 255, g: 255, b: 0 } },
            { pct: 1.0, color: { r: 255, g: 0, b: 0 } } ];
        this.listActions = [];
        this.maxStepConfig = 4; 
        this.ventana = null;
        this.state = {
            windowTime: 3*60*60 *1000, //El ultimo mil es porque es en milisegundos
            indexLoc: null,
            center: [0,20],
            zoom: 1,
            loading: 0,
            visibleModalConfig: false,
            tooltipConfig: null,
            myMap:null,
            frecTime: 120,
            intervalClock: null,
            intervalWindowClock: null,
            inPause: false,
            iniTime: 0,
            time: new Date().getTime(),
            realTime: 0,
            infoVuelos:[],
            archivo:{},
            stepConfig:1,

            infoCollapsed: {},
            errorConfig: false,
            locationInfo: [],
            selectedCountries: [],
            planVuelos:[
               /* {
                    fechaLlegada: 1543795200000,
                    oficinaSalida: "BOL",
                    oficinaLlegada: "PER",
                    fechaSalida: new Date().setHours(18,41,0,0),
                    tipo: "SALIDA",
                    cantidad: 100,
                    cantidadSalida: 25
                }*/
            ],
            paquetesEnviados: 0,
            showModalCollapsed: false,
            collapsed: false,

        }
        this.getLocationDef = this.getLocationDef.bind(this);
        this.buildCurves = this.buildCurves.bind(this);
        this.getContentModalCity = this.getContentModalCity.bind(this);
        this.handleClickGeography = this.handleClickGeography.bind(this);
        //Zoom the city
        this.isCountrySelected = this.isCountrySelected.bind(this);
        this.handleFrecTimeChange = this.handleFrecTimeChange.bind(this);
        this.handleTimeDateChange = this.handleTimeDateChange.bind(this);
        this.handleWindowTimeChange = this.handleWindowTimeChange.bind(this);
    }
    componentWillMount(){
        setTimeout(()=>{
            ReactTooltip.rebuild()
        },100)  
    } 
    
    handleOpenModalConfig = (e) => {
        this.setState({
            visibleModalConfig: true,
        });
    }

    handleCancelModalConfig = (e) => {
        this.setState({
            visibleModalConfig: false,
        });
    }
    handleModalCollap = (e) => {
        this.setState({
            showModalCollapsed: false,
        });
    }
    restartSimu = () => {
        API.get('simulacion/eliminar')
            .then(response => {
                this.listActions = [];
                this.setState({
                    windowTime: 3*60*60 *1000,
                    indexLoc: null,
                    center: [0,20],
                    zoom: 1,
                    loading: 0,
                    visibleModalConfig: false,
                    tooltipConfig: null,
                    myMap:null,
                    frecTime: 120,
                    intervalClock: null,
                    intervalWindowClock: null,
                    inPause: false,
                    iniTime: 0,
                    time: new Date().getTime(),
                    realTime: 0,
                    infoVuelos:[],
                    archivo:{},
                    stepConfig:1,

                    infoCollapsed: {},
                    errorConfig: false,
                    locationInfo: [],
                    selectedCountries: [],
                    planVuelos:[],
                    paquetesEnviados: 0,
                    showModalCollapsed: false,
                    collapsed: false,
                })
            });
    }
    contentConfigModal = (numStep) => {
        switch(numStep){
            case 1:
                return (
                    <div>
                        <strong><p>Paso {this.state.stepConfig} de {this.maxStepConfig}</p></strong>
                        <div className="title-config">Sube el archivo de ofinas o areropuertos</div>
                        <div style={{textAlign:'center'}}><input type="file" onChange={this.onChangeFileLoad} /></div>
                        {this.state.errorConfig ? <div style={{color:'#f5222d'}} className="error-config">Hubo un error al subir el archivo, intentelo de nuevo</div> : '' }
                    </div>
                );
            case 2:
                return (
                    <div>
                        <strong><p>Paso {this.state.stepConfig} de {this.maxStepConfig}</p></strong>
                        <div className="title-config">Sube el archivo de vuelos programados</div>
                        <div style={{textAlign:'center'}}><input type="file" onChange={this.onChangeFileLoad} /></div>
                        {this.state.errorConfig ? <div style={{color:'#f5222d'}} className="error-config">Hubo un error al subir el archivo, intentelo de nuevo</div> : '' }
                    </div>
                );  
            case 3:
                return (
                    <div>
                        <strong><p>Paso {this.state.stepConfig} de {this.maxStepConfig}</p></strong>
                        <div className="title-config">Sube el archivo de registro de paquetes</div>
                        <div style={{textAlign:'center'}}><input type="file" onChange={this.onChangeFileLoad} /></div>
                        {this.state.errorConfig ? <div style={{color:'#f5222d'}} className="error-config">Hubo un error al subir el archivo, intentelo de nuevo</div> : '' }
                    </div>
                );
            case 4:
                return (
                    <div>
                        <strong><p>Paso {this.state.stepConfig} de {this.maxStepConfig}</p></strong>
                        <div className="title-config">Establece la fecha inicial y la escala de tiempo</div>
                        <div>
                            Seleccione la fecha inicio: <DatePicker onChange={this.handleTimeDateChange} />
                        </div>
                        <div style={{marginTop:'1rem'}}>
                            Seleccione la hora inicio: <TimePicker onChange={this.handleTimeChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                        </div>
                        <div style={{marginTop:'1rem'}}>
                            Multiplicador de velocidad: <InputNumber min={1} defaultValue={this.state.frecTime} onChange={this.handleFrecTimeChange} />x seg
                        </div>
                        <div style={{marginTop:'1rem'}}>
                            Intervalo de tiempo: <InputNumber min={1} defaultValue={this.state.windowTime} onChange={this.handleWindowTimeChange} />
                        </div>
                        <p>La velocidad se ve incrementada x<strong>{this.state.frecTime}</strong></p>
                    </div>
                );
        }
    } 
    
    handleOkModalConfig = (e) => {
        let urlApi = '';
        switch(this.state.stepConfig){
            case 1:
                urlApi = '/simulacion/oficinas/carga';
                break;
            case 2:
                urlApi = '/simulacion/vuelos/carga';
                break;
            case 3:
                urlApi = '/simulacion/paquetes/carga';
                break;
            case 4:
                urlApi = '';
                break;
        }
        if(urlApi != ''){
            API.post(urlApi, this.state.archivo)
            .then(response => {
                if(this.state.stepConfig == 1){
                    API.get('/simulacion/oficinas').then(response =>{
                        console.log("oficinas:",response.data);
                        let selectedCountries = [];
                        let aux = [];
                        let mapIndexLoc = new Map();
                        response = response.data
                        for (let i = 0; i < response.length; i++) {
                            let obj = [];
                            response[i].cantidad = 0; //indica la cantidad  de paquetes que pasaron por el aeropuerto
                            obj.push(response[i].pais.codigoIso);
                            obj.push(response[i]);
                            mapIndexLoc.set(response[i].pais.codigoIso,i);
                            aux.push(obj);
                        }
                        this.setState({
                            indexLoc: mapIndexLoc,
                            myMap:new Map(aux),
                            locationInfo: response,
                            selectedCountries: selectedCountries,
                            stepConfig: this.state.stepConfig + 1,
                            visibleModalConfig: this.state.stepConfig == this.maxStepConfig ? false : true,
                            errorConfig : false,
                            archivo:{},
                        });
                      });
                }else{
                    this.setState({
                        stepConfig: this.state.stepConfig + 1,
                        visibleModalConfig: this.state.stepConfig == this.maxStepConfig ? false : true,
                        errorConfig : false,
                        archivo:{},
                    });
                }
            }).catch(response => {
                this.setState({
                    visibleModalConfig: true,
                    errorConfig : true,
                    archivo: {},
                });
            });
        }else{
            this.setState({
                stepConfig: this.state.stepConfig + 1,
                visibleModalConfig: this.state.stepConfig == this.maxStepConfig ? false : true,
                archivo:{},
            });
        }
    }
    onChangeFileLoad = e => {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append("file", file);
        this.setState({
            archivo: formData
        });
    };  
    handleWindowTimeChange(value){
        this.setState({
            windowTime: value,
        });
    }
    handleTimeDateChange(objData, dataString){
      let newTimeArr = dataString.split("-");
      //let newDateTime = new Date(Date.UTC(parseInt(newTimeArr[0]),parseInt(newTimeArr[1])-1,parseInt(newTimeArr[2])));
      let newDateTime = new Date(parseInt(newTimeArr[0]),parseInt(newTimeArr[1])-1,parseInt(newTimeArr[2]));
      this.setState({
        time: newDateTime.getTime(),
        realTime: newDateTime.getTime(),
      });
    }
    handleTimeChange = (objTime, timeString) => {
        let newTimeArr = timeString.split(":");
        let newDateTime = new Date(this.state.time);
        newDateTime.setHours(parseInt(newTimeArr[0])-5,parseInt(newTimeArr[1]),parseInt(newTimeArr[2]));
        this.setState({
            iniTime: newDateTime.getTime(),
            time: newDateTime.getTime(),
            realTime: newDateTime.getTime(),
        });
    }
    handleFrecTimeChange(value){
      this.setState({
        frecTime: value,
      });
    }

    tickClock = () => {
      let oldTime = this.state.time;
      let newTime = this.state.time + this.frecRefreshSimu*this.state.frecTime;
      if(newTime >= this.state.realTime){
        newTime = this.state.realTime

      }
      let timeColap;
      //Ini: Calculos que se deben hacer por cada tick del reloj
      let auxLocationInfo = JSON.parse(JSON.stringify(this.state.locationInfo));
      let auxIndex = this.state.indexLoc;
      let auxPlanesNew = [];
      let esTemprano = true;
      let obj;
      let idx;
      let isCollapsed = false;
      let infoCollapsedFull  = {}
      let objInfoCollap = {};
      while(this.listActions.length != 0 && esTemprano){
        if(this.listActions[0].fechaSalida <= newTime){
            sem.take(()=>{
                obj = this.listActions.shift();
                sem.leave();

                if(obj.tipo == "REGISTRO"){
                    idx = auxIndex.get(obj.oficinaLlegada);
                    auxLocationInfo[idx].capacidadActual++;
                    auxLocationInfo[idx].cantidad++;

                    if(auxLocationInfo[idx].capacidadActual > auxLocationInfo[idx].capacidadMaxima){
                        isCollapsed = true;
                        timeColap = obj.fechaSalida;
                        objInfoCollap = {code: auxLocationInfo[idx].codigo,  maxCap:auxLocationInfo[idx].capacidadMaxima }
                    }
                }else if(obj.tipo == "SALIDA"){
                    auxPlanesNew.push(obj);
                    idx = auxIndex.get(obj.oficinaSalida);
                    auxLocationInfo[idx].capacidadActual -= obj.cantidad;
                }
            });
            
        }else{
          esTemprano = false;
        }
      }

      //manejar vuelos terminados
      let liveFlights = this.state.planVuelos.filter(e => e.fechaLlegada > newTime );
      let finishedFlights = this.state.planVuelos.filter(e => e.fechaLlegada <= newTime );

      let acumSalida = 0;
      
      for(let delElem of finishedFlights){
        let idxDel = auxIndex.get(delElem.oficinaLlegada);
        if(auxLocationInfo[idxDel].capacidadActual + delElem.cantidad > auxLocationInfo[idxDel].capacidadMaxima){
            isCollapsed = true;
            timeColap = delElem.fechaLlegada;
            objInfoCollap = {code: auxLocationInfo[idxDel].codigo , maxCap: auxLocationInfo[idxDel].capacidadMaxima}
            auxLocationInfo[idxDel].capacidadActual += delElem.cantidad
        }else{
            auxLocationInfo[idxDel].capacidadActual += delElem.cantidad - delElem.cantidadSalida;
        }
        if(auxLocationInfo[idxDel].capacidadActual < 0){
        }
        acumSalida += delElem.cantidadSalida;
      }
      if(isCollapsed){
        infoCollapsedFull = {
            fechaInicial: this.state.iniTime,
            duracionTotal: timeColap - this.state.iniTime,
            almacenColapso: objInfoCollap.code,
            cantidadAumento: objInfoCollap.maxCap*1.1,
            paquetesEnviados: this.state.paquetesEnviados,
            oficinas: auxLocationInfo
        }
        clearInterval(this.ventana);
        clearInterval(this.state.intervalWindowClock);
      }
      if(newTime >= this.state.realTime){
        clearInterval(this.ventana);
        this.ventana = null;
        }
      this.setState({
        intervalClock: null,
        locationInfo: auxLocationInfo,
        time: newTime,
        planVuelos: liveFlights.concat(auxPlanesNew),
        infoCollapsed: infoCollapsedFull,   
        collapsed: isCollapsed,
        paquetesEnviados :acumSalida + this.state.paquetesEnviados,
        showModalCollapsed: true,
      });
      //Fin
    }

    sendRequestActions = () => {
            API.post('simulacion/window',
                {
                simulacion:  1, 
                inicio: new Date(this.state.realTime/* - 5*60*60*1000*/),
                fin: new Date(this.state.realTime + this.state.windowTime /*- 5*60*60*1000*/),
                }
            ).then(resp => {
                if(resp.data.status == 0){ // sigo pidiendo
                    sem.take(()=>{
                        this.listActions = this.listActions.concat(resp.data.listActions);
                        sem.leave();
                        if(!this.ventana){
                            var intClock = setInterval(
                                () => this.tickClock()
                                ,this.frecRefreshSimu); 
                            
                            this.ventana = intClock;
                        }
                        this.setState({
                            realTime: this.state.realTime + this.state.windowTime,
                            intervalClock: intClock,
                        },() => {
                            this.sendRequestActions();
                        });
                    });
                }else{
                    sem.take(()=>{
                        this.listActions = this.listActions.concat(resp.data.listActions);
                        sem.leave();
                        if(!this.ventana){
                            var intClock = setInterval(
                                () => this.tickClock()
                                ,this.frecRefreshSimu); 
                            
                            this.ventana = intClock;
                        }
                    });

                    clearInterval(this.state.intervalWindowClock);
                    this.setState({
                        realTime: this.state.realTime + this.state.windowTime,
                        intervalWindowClock: null,
                    })
                }
            });
        
    }
    handleStartClock = () => {
      if(this.state.intervalClock){
      }else{
        this.setState({
            loading: 1,
        }, () => {
            API.post('simulacion/window',
                {
                simulacion:  1, 
                inicio: new Date(this.state.realTime /* - 5*60*60*1000*/), //2018-04-16T19:01:00 
                fin: new Date(this.state.realTime + this.state.windowTime /* - 5*60*60*1000*/), //2018-04-20T03:01:00
                }
            ).then(resp => {
                if(resp.data.status == 0){
                    sem.take(()=>{
                        this.listActions = this.listActions.concat(resp.data.listActions);
                        sem.leave();
                        var intClock = setInterval(
                            () => this.tickClock()
                            ,this.frecRefreshSimu); 
/*
                        let intWindowClock = setInterval(
                            () => this.sendRequestActions()
                            ,Math.floor(this.state.windowTime/(this.state.frecTime)));
*/                    
                        this.ventana = intClock;
                        this.setState({
                            realTime: this.state.realTime + this.state.windowTime,
                            intervalClock: intClock,
                            //intervalWindowClock: intWindowClock,
                            inPause: false,
                            loading: 0,
                        },()=>{
                            this.sendRequestActions();
                        })
                    });
                }else{
                    console.log("HA OCURRIDO UN ERROR EN LA PRIMERA VENTANA DE TIEMPO");
                }
            });
        });
      }
    }
    handleReplay = () => {
        let intClock = setInterval(
            () => this.tickClock()
            ,this.frecRefreshSimu); 
            this.ventana = intClock;
        /*let intWindowClock = setInterval(
            () => this.sendRequestActions()
            ,Math.floor(this.state.windowTime/this.state.frecTime));
*/
        this.setState({
            intervalClock: intClock,
            //intervalWindowClock: intWindowClock,
            inPause: false,
        });
    }
    handlePause = () => {
          clearInterval(this.state.intervalClock);
          clearInterval(this.ventana);
          //clearInterval(this.state.intervalWindowClock);

          this.setState({
              intervalClock: null,
              //intervalWindowClock: null,
              inPause: true,
          });
    }

    isCountrySelected(elem){
        return this.state.selectedCountries.includes(elem);
    }

    handleClickGeography(geo,evt){
        let objLoc = this.getLocationDef(geo);
        if(objLoc){
            if(this.isCountrySelected(geo.properties.ISO_A3)){
                this.setState({
                    selectedCountries: this.state.selectedCountries.filter(e => e != geo.properties.ISO_A3)
                })
            }else{
                this.setState({
                    selectedCountries: [...this.state.selectedCountries,geo.properties.ISO_A3]
                })
            }
        }
    }
    getLocationDef(obj){
        let objLoc = this.state.locationInfo.find(e => e.pais.codigoIso == obj.properties.ISO_A3);
        if(objLoc){
            return objLoc;
        }
        return false;
    }
    buildCurves(start, end, line) {
        const x0 = start[0];
        const x1 = end[0];
        const y0 = start[1];
        const y1 = end[1];
        const curve = {
          forceUp: `${x1} ${y0}`,
          forceDown: `${x0} ${y1}`
        }['forceDown'];
        return `M ${start.join(' ')} Q ${curve} ${end.join(' ')}`;
    }

    getContentModalCity(item){
        if(item){
            let elem = JSON.parse(item);
            let infoObj = this.getLocationDef(elem);
            
            if(infoObj){
                return (
                    <div>{elem.properties.NAME_ES + " - " +elem.properties.ISO_A3 +" - " + infoObj.codigo }
                        <div>{"Capacidad: " + infoObj.capacidadActual + "/" + infoObj.capacidadMaxima}</div>
                    </div>
                )
            }else{
                return (
                    <div>{elem.properties.NAME_ES}</div>
                )
            }  
        }
    } 
 
    getHexColor = (max, act, percentColors) => {
        let pct = act/max;
        for (var i = 1; i < percentColors.length - 1; i++) {
            if (pct < percentColors[i].pct) {
                break;
            }
        }
        var lower = percentColors[i - 1];
        var upper = percentColors[i];
        var range = upper.pct - lower.pct;
        var rangePct = (pct - lower.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };

        let p1 = Number(color.r).toString(16).padStart(2, "0");
        let p2 = Number(color.g).toString(16).padStart(2, "0");
        let p3 = Number(color.b).toString(16).padStart(2, "0");

        return '#'+p1+p2+p3;
    }
	
	getHexColor2 = (max,act,percentColors) => {
		let color = {}
		
		if(act < 25){
			color.r = 0;
			color.g = 176;
			color.b = 80;
		}else if (act < 50){
			color.r = 153;
			color.g = 255;
			color.b = 102;
		}else if( act < 75){
			color.r = 204;
			color.g = 204;
			color.b = 0;
		}else if(act < 100){
			color.r = 255;
			color.g = 255;
			color.b = 0;
		}else if (act < 125){
			color.r = 255;
			color.g = 192;
			color.b = 0;
		}else if (act < 150){
			color.r = 255;
			color.g = 153;
			color.b = 51;
		}else if (act <175){
			color.r = 248;
			color.g = 96;
			color.b = 48;
		}else{
			color.r = 255;
			color.g = 0;
			color.b = 0;
		}
		
		let p1 = Number(color.r).toString(16).padStart(2, "0");
        let p2 = Number(color.g).toString(16).padStart(2, "0");
        let p3 = Number(color.b).toString(16).padStart(2, "0");

        return '#'+p1+p2+p3;
	}		
    render(){
        const {loading, planVuelos, inPause ,collapsed,infoCollapsed, showModalCollapsed,time, locationInfo} = this.state;
        let objTime = new Date(this.state.time);
        return(
            <Layout>
            <TheHeader>
                <h1> Simulación</h1>
                
            </TheHeader>
            <TheContent>
            <div style={{position:'relative'}}>
            {loading == 1 ? <div style={{position:'fixed', top:'50%',left:'50%'}}><Spin /></div> : '' }
            
            {collapsed && showModalCollapsed? <ModalReporte onHandleClose={this.handleModalCollap} info={infoCollapsed}/> : ""}
            <div style={{position: 'absolute',bottom: '53px',left: '50%',transform: 'translateX(-50%)',border: '1px solid #888686',padding: '5px 10px',borderRadius: '10px'}}>
                <div style={{fontWeight:'bold',fontSize:'20px'}}>{objTime.toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
                
                
                <Button type="primary" onClick={this.state.stepConfig > this.maxStepConfig? this.handleStartClock : this.handleOpenModalConfig}>
                    {this.state.stepConfig > this.maxStepConfig? "Iniciar simulación" : "Establecer Configuraciones" }
                </Button>
                { inPause ?
                    <Button onClick={this.handleReplay}>Reanudar</Button>
                    :
                    <Button onClick={this.handlePause}>Pausar</Button>
                }
                <Button type="primary" onClick={this.restartSimu} >Resetear</Button>
            </div>
            <Modal
                title="Configuración de la simulación"
                visible={this.state.visibleModalConfig}
                onOk={this.handleOkModalConfig}
                onCancel={this.handleCancelModalConfig}
            >
                {this.contentConfigModal(this.state.stepConfig)}
            </Modal>
            <div className="cities">
                <strong style={{textDecoration: 'underline'}}>LISTA:</strong>
                {JSON.parse(JSON.stringify(locationInfo)).sort((a,b) => {
                    return b.capacidadActual - a.capacidadActual;
                }).map((obj,idx) => {
                    return (
                        <div key={idx} style={{fontSize:'10px',textAlign:'left'}}><strong>{idx+1+")"+obj.codigo + ": "+obj.capacidadActual}</strong></div>
                    );
                })}
            </div>
            <ComposableMap
                        className="mapa"
                        projectionConfig={{
                            scale: 165,
                            rotation: [-10,0,0],
                    }}>
                <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
                <Geographies geography={map}
                        disableOptimization={true}>
                    {(geographies, projection) => geographies.map((geography,index) => (
                    <Geography
                        key={index}
                        geography={geography}
                        projection={projection}
                        data-for='modal-city'
                        data-tip={JSON.stringify(geography)}
                        onClick={this.handleClickGeography}
                        style={{
                        default: {
                            fill: this.getLocationDef(geography) ? this.getHexColor(this.getLocationDef(geography).capacidadMaxima,this.getLocationDef(geography).capacidadActual,this.percentColors) : "#AEC6CF",
                            stroke: this.getLocationDef(geography) ? (this.isCountrySelected(geography.properties.ISO_A3) ? this.colorSelected : this.colorUnSelected ) :  this.colorCommon,
                            strokeWidth: 0.3,
                            outline: "none",
                        },
                        hover: {
                            fill: this.colorHover,
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                        },
                        pressed: {
                            fill: this.colorPressed,
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                        },
                        }}
                    />
                    ))
                }
                </Geographies>
                <Markers>
                        {
                            planVuelos.map((item,i)=>{
                            let salida =this.state.myMap.get(item.oficinaSalida);
                            let llegada=this.state.myMap.get(item.oficinaLlegada);

                            let distX = mathjs.distance({pointOneX: salida.pais.longitud, pointOneY: 0},{pointTwoX: llegada.pais.longitud, pointTwoY: 0});
                            let distY = mathjs.distance({pointOneX: salida.pais.latitud, pointOneY: 0},{pointTwoX: llegada.pais.latitud, pointTwoY: 0});
                            let auxTime = time > item.fechaLlegada ? item.fechaLlegada : time;

                            let segX = (auxTime - item.fechaSalida) * (distX)/(item.fechaLlegada - item.fechaSalida);
                            let segY = (auxTime - item.fechaSalida) * (distY)/(item.fechaLlegada - item.fechaSalida) 


                            let xPoint = (llegada.pais.longitud > salida.pais.longitud ? salida.pais.longitud + segX : salida.pais.longitud - segX );
                            let yPoint = (llegada.pais.latitud > salida.pais.latitud ? salida.pais.latitud + segY : salida.pais.latitud - segY);
                            return(
                                <Marker
                                    key={i}
                                    marker={{ coordinates: [ xPoint, yPoint ] }}
                                    preserveMarkerAspect={false}
                                    style={{
                                        default: { 
                                            fill: this.getHexColor2(item.capacidadMaxima,item.cantidad, this.percentColorsFlights),
                                            stroke: "#00000021",
                                            strokeWidth: 0.1,
                                            outline: "none",
                                        },
                                        hover:   { fill: "#999" },
                                        pressed: { fill: "#000" },
                                        }}
                                >
                                    <circle cx={ 0 } cy={ 0 } r={ 1 } />     
                                </Marker> 
                            )
                        })}
                </Markers>  
              </ZoomableGroup>
            </ComposableMap>
            <ReactTooltip id='modal-city'
                getContent={this.getContentModalCity}
            />
            </div>
            </TheContent>
            </Layout>
        );
    }
}

export default Simulacion;