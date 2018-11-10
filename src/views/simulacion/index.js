import React, { Component } from 'react';
import { Layout ,Select,Button} from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import { ComposableMap,ZoomableGroup,Geographies,Geography,Markers,Marker,Line,Lines} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import {findDOMNode} from 'react-dom'
import map from "./../../utils/files/world-50m-simplified.json";
import Modal from './Modal';
import API from '../../Services/Api';

const Option = Select.Option;

class Simulacion extends Component{
    constructor(props) {
        super(props);
        this.cont = 0;
        this.colorSelected = '#f5cc00' ;
        this.colorCommon = '#ECEFF1';
        this.colorUnSelected ='#c7a602';
        this.colorHover = '#607D8B';
        this.colorPressed = '#FF5722';
        this.frecRefreshSimu = 2000;
        this.foo = new Date();
        this.state = {
            center: [0,20],
            zoom: 1,
            tooltipConfig: null,
            myMap:null,
            frecTime: 1,
            intervalClock: null,
            time: new Date().getTime(),
            infoVuelos:[],
            locationInfo: [],
            selectedCountries: [],
            planVuelos:[{
              fechaLlegada: 1355316000000,
              oficinaSalida: "BOL",
              oficinaLlegada: "PER",
              fechaSalida: 1355316900000,
              tipo: "SALIDA",
              cantidad: 100,
              cantidadSalida: 25
              },{fechaLlegada: 1355316000000,
              oficinaSalida: "ECU",
              oficinaLlegada: "AUT",
              fechaSalida: 1355316900000,
              tipo: "SALIDA",
              cantidad: 100,
              cantidadSalida: 25
              }],
            planVuelosParcial:[]
        }
        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getLocationDef = this.getLocationDef.bind(this);
        this.buildCurves = this.buildCurves.bind(this);
        this.getContentModalCity = this.getContentModalCity.bind(this);
        this.handleClickGeography = this.handleClickGeography.bind(this);
        //Zoom the city
        this.handleCitySelection = this.handleCitySelection.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleModalContent = this.handleModalContent.bind(this);
        this.isCountrySelected = this.isCountrySelected.bind(this);
        this.handleFrecTimeChange = this.handleFrecTimeChange.bind(this);
        this.tickClock = this.tickClock.bind(this);
        this.handleStartClock = this.handleStartClock.bind(this);
        this.handleTimeDateChange = this.handleTimeDateChange.bind(this);
    }
    

    componentWillMount(){
        API.get('/simulaciones/1/oficinas').then(response =>{
          let selectedCountries = [];
          console.log(response.data)
          for(let loc of response.data){
            selectedCountries.push(loc.pais.codigoIso);
          }
          let aux = [];
          for (let i = 0; i < response.data.length; i++) {
              let obj = [];
              obj.push(response.data[i].pais.codigoIso);
              obj.push(response.data[i]);
              aux.push(obj)
          }
          this.setState({
            locationInfo: response.data,
            selectedCountries: selectedCountries,
            planVuelosParcial : this.state.planVuelos,
            myMap:new Map(aux)
          },()=>{

          });
      })
        setTimeout(()=>{
            ReactTooltip.rebuild()
        },100)
    }
    handleTimeDateChange(e){
      let newTimeArr = e.target.value.split("-");
      let newDateTime = new Date(parseInt(newTimeArr[0]),parseInt(newTimeArr[1]-1),parseInt(newTimeArr[2]))
      console.log("ll>",newDateTime);
      this.setState({
        time: newDateTime.getTime()
      })
    }
    handleFrecTimeChange(e){
      this.setState({
        frecTime: e.target.value,
      });
    }
    tickClock(){
      this.setState({
        time: this.state.time + this.frecRefreshSimu*this.state.frecTime
      })
    }
    handleStartClock(){
      if(this.state.intervalClock){
        //elimina y crea de nuevo
        console.log(">>",this.state.intervalClock);
        //clearInterval(this.state.intervalClock);
      }else{
        let intClock = setInterval(
          () => this.tickClock()
          ,this.frecRefreshSimu);
        this.setState({
            intervalClock: intClock
        })
      }
    }
    isCountrySelected(elem){
        return this.state.selectedCountries.includes(elem);
    }
    //Filtrado de vuelosXpais
    quitarVuelosXPais(elem){
      this.setState({
        planVuelosParcial: this.state.planVuelosParcial.filter(i=>i.oficinaSalida!==elem && i.oficinaLlegada!==elem )
      })
    }
    añadirVuelosXPais(elem){
        console.log("oficina:",  elem);
      let lista = this.state.planVuelos.filter(i=>i.oficinaSalida===elem || i.oficinaLlegada===elem)
      console.log("Añadir vuelos",lista)
      lista.forEach(e=>{
        this.state.planVuelosParcial.push(e)
      })
    }
    //ZOOM the city
    handleCitySelection=(e)=> {
        let item = this.state.myMap.get(e.key)
        this.setState({
          center: [item.pais.longitud,item.pais.latitude],
          zoom: 2,
        })
      }
    handleReset() {
        this.setState({
          center: [0,20],
          zoom: 1,
        })
    }

    handleZoomIn() {
        this.setState({
            zoom: this.state.zoom * 1.2,
        })
    }
    handleZoomOut() {
        this.setState({
            zoom: this.state.zoom / 1.2,
        })
    }
    handleClick(geography, evt) {
        let objLoc = this.getLocationDef(geography);
        if(objLoc){
            console.log("Estado pais");
        }else{
            console.log("Pais no declarado");
        }
    }
    handleClickGeography(geo,evt){
        let objLoc = this.getLocationDef(geo);
        if(objLoc){
            if(this.isCountrySelected(geo.properties.ISO_A3)){
                this.setState({
                    selectedCountries: this.state.selectedCountries.filter(e => e != geo.properties.ISO_A3)
                })
                console.log("quita",this.state.selectedCountries.filter(e => e != geo.properties.ISO_A3));
                this.quitarVuelosXPais(geo.properties.ISO_A3);
                console.log("Plan vuelos:",this.state.planVuelosParcial);
            }else{
                //Se agrega
                this.setState({
                    selectedCountries: [...this.state.selectedCountries,geo.properties.ISO_A3]
                })
                console.log("agrega",[...this.state.selectedCountries,geo.properties.ISO_A3]);
                this.añadirVuelosXPais(geo.properties.ISO_A3);
            }
        }
    }
    getLocationDef(obj){
        let objLoc = this.state.locationInfo.find(e => e.pais.codigoIso == obj.properties.ISO_A3);
        if(objLoc){
            this.cont++;
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
    handleMouseUpMarker(geo,e){
        console.log(">>u",geo,e);
    }
    handleModalContent(geo){
        return <h1>{geo.properties.NAME}</h1>;
    }
    getContentModalCity(item){
        if(item){
            let elem = JSON.parse(item);
            let infoObj = this.getLocationDef(elem);
            
            if(infoObj){
                //console.log("..",infoObj);
                return (
                    <div>{elem.properties.NAME + " - " +elem.properties.ISO_A3 +" - " + infoObj.codigo }
                        <div>{"Capacidad: " + infoObj.capacidadActual + "/" + infoObj.capacidadMaxima}</div>
                    </div>
                    )
            }else{
                return (
                    <div>{elem.properties.NAME}</div>
                )
            }  
        }
    } 
    getContentModalFlight(item){
      console.log(item);
      return(
        <div>Hola mundo</div>
      )
    }

    render(){
        const { locationInfo,planVuelosParcial } = this.state;
        var divStyle = {
            display:this.state.disableDiv?'block':'none'
        };
        let objTime = new Date(this.state.time);
        let timeStringFormat = objTime.getFullYear()+"-"+(objTime.getMonth()+1+"").padStart(2,"0")+"-"+(objTime.getDate()+"").padStart(2,"0");
        return(
            <Layout>
            <TheHeader>
                <h1> Simulación </h1>
            </TheHeader>
            <TheContent>
            <div>
            <input type="date" value={timeStringFormat} onChange={this.handleTimeDateChange}/>
            <input type="number" value={this.state.frecTime} onChange={this.handleFrecTimeChange}/>
            {objTime.toLocaleString()}
            <button onClick={this.handleStartClock}>Start</button>
            </div>
            <ComposableMap
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
                            fill: this.getLocationDef(geography) ? (this.isCountrySelected(geography.properties.ISO_A3) ? this.colorSelected : this.colorUnSelected ) :  this.colorCommon,
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
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
                        {locationInfo.map((item, i) => { 
                            return (
                                    <Marker key={i} 
                                            marker={{ coordinates: [ item.pais.longitud, item.pais.latitud ] }}
                                            preserveMarkerAspect={false}
                                            style={{
                                                default: { fill: "#000" },
                                                hover:   { fill: "#999" },
                                                pressed: { fill: "#000" },
                                              }}
                                            >                                      
                                        <circle cx={ 0 } cy={ 0 } r={ 1 } />                              
                                    </Marker>);
                        })}
                </Markers>  
                <Lines>
                  {planVuelosParcial.map((item,i)=>{
                    let salida =this.state.myMap.get(item.oficinaSalida);
                    let llegada=this.state.myMap.get(item.oficinaLlegada);
                    console.log("efjpweo",this.state.planVuelosParcial)
                    return(
                      <Line
                        data-tip={JSON.stringify(item)}
                        data-id='modal-flight'
                        className="world-map-arc"
                        line={{
                                coordinates: {
                                    start: [salida.pais.longitud,salida.pais.latitud],
                                    end: [llegada.pais.longitud, llegada.pais.latitud]
                                }
                        }}
                        preserveMarkerAspect={false}
                        buildPath={this.buildCurves}
                        style={{
                            default: { stroke: "#FF4233" },
                            hover:   { stroke: "#999" },
                            pressed: { stroke: "#000" },
                          }}
                      />
                    )
                  })}
            </Lines>
            
              </ZoomableGroup>
            </ComposableMap>
            <ReactTooltip  id='modal-flight' getContent={this.getContentModalFlight}/>
            <ReactTooltip id='modal-city'
                getContent={this.getContentModalCity}
            />
            </TheContent>
            </Layout>
        );
    }
}

export default Simulacion;