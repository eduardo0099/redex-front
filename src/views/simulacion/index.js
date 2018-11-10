import React, { Component } from 'react';
import { Layout ,Select,Button} from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import { ComposableMap,ZoomableGroup,Geographies,Geography,Markers,Marker,Line,Lines} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
//Imagen del mapa
import map from "./../../utils/files/world-50m-simplified.json";
//import locAlm from './../../utils/files/locations.json';
import Modal from './Modal';
import API from './../../Services/Api';

const Option = Select.Option;

class Simulacion extends Component{
    constructor(props) {
        super(props);
        this.cont = 0;
        this.colorSelected = '#c7a602';
        this.colorCommon = '#ECEFF1';
        this.colorUnSelected = '#f5cc00';
        this.colorHover = '#607D8B';
        this.colorPressed = '#FF5722';
        this.frecRefreshSimu = 2000;
        this.foo = new Date();
        this.listActions = [];
        this.state = {
            windowTime: 5*60*60 *1000, //El ultimo mil es porque es en milisegundos
            indexLoc: null,
            center: [0,20],
            zoom: 1,
            tooltipConfig: null,
            myMap:null,
            frecTime: 1,
            intervalClock: null,
            intervalWindowClock: null,
            time: new Date().getTime(),
            infoVuelos:[],
            locationInfo: [],
            selectedCountries: [],
            planVuelos:[],
            num:10
        }

        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getLocationDef = this.getLocationDef.bind(this);
        this.buildCurves = this.buildCurves.bind(this);
        this.getContentModalCity = this.getContentModalCity.bind(this);
        this.handleClickGeography = this.handleClickGeography.bind(this);
        //Zoom the city
        this.handleCitySelection = this.handleCitySelection.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleModalContent = this.handleModalContent.bind(this);
        this.isCountrySelected = this.isCountrySelected.bind(this);
        this.handleFrecTimeChange = this.handleFrecTimeChange.bind(this);
        this.tickClock = this.tickClock.bind(this);
        this.handleStartClock = this.handleStartClock.bind(this);
        this.handleTimeDateChange = this.handleTimeDateChange.bind(this);
        this.handleWindowTimeChange = this.handleWindowTimeChange.bind(this);
        this.sendRequestActions = this.sendRequestActions.bind(this);
    }

    async loadData(){
      try{
        /*this.setState({
        planVuelos:[]
        })*/
      }catch(e){
        console.log(e);
      }
    }

    componentWillMount(){
      API.get('/simulaciones/1/oficinas').then(response =>{
        let selectedCountries = [];
        let aux = [];
        let mapIndexLoc = new Map();
        response = response.data
        for (let i = 0; i < response.length; i++) {
            let obj = [];
            obj.push(response[i].pais.codigoIso);
            obj.push(response[i]);
            mapIndexLoc.set(response[i].pais.codigoIso,i);
            selectedCountries.push(response[i].pais.codigoIso);
            aux.push(obj);
        }

        this.setState({
            indexLoc: mapIndexLoc,
            myMap:new Map(aux),
            locationInfo: response,
            selectedCountries: selectedCountries
        });
      });
      
        setTimeout(()=>{
            ReactTooltip.rebuild()
        },100)
        
    }   
    handleWindowTimeChange(e){
        this.setState({
            windowTime: e.target.value,
        });
    }
    handleTimeDateChange(e){
      let newTimeArr = e.target.value.split("-");
      let newDateTime = new Date(parseInt(newTimeArr[0]),parseInt(newTimeArr[1]-1),parseInt(newTimeArr[2]))
      this.setState({
        time: newDateTime.getTime()
      })
    }
    handleFrecTimeChange(e){
      this.setState({
        frecTime: e.target.value,
      });
    }
    sendRequestActions(){
        API.post('simulaciones/window',
            {
            simulacion:  1, 
            inicio: '2018-04-16T19:01:00', 
            fin: '2018-04-20T03:01:00',
            }
        ).then(resp => {
            this.listActions = resp.data;
            console.log(">",this.listActions);
        });
    }
    tickClock(){
      let oldTime = this.state.time;
      let newTime = this.state.time + this.frecRefreshSimu*this.state.frecTime;
      //Ini: Calculos que se deben hacer por cada tick del reloj
      let auxLocationInfo = [...this.state.locationInfo];
      let auxIndex = this.state.indexLoc;
      let auxPlanesNew = [];
      let esTemprano = true;
      let obj;
      let idx;
      while(this.listActions.length != 0 && esTemprano){
        if(this.listActions[0].fechaSalida < this.state.time){

          obj = this.listActions.shift();

          if(obj.tipo == "REGISTRO"){
            idx = auxIndex.get(obj.oficinaLlegada);
            auxLocationInfo[idx].capacidadActual++;
            console.log("R");
          }else if(obj.tipo == "SALIDA"){
            auxPlanesNew.push(obj);
            idx = auxIndex.get(obj.oficinaLlegada);
            auxLocationInfo[idx].capacidadActual -= obj.cantidad;
            console.log("S");
          }

        }else{
          esTemprano = false;
        }
      }

      //manejar vuelos terminados
      let liveFlights = this.state.planVuelos.filter(e => e.fechaLlegada > newTime );
      let finishedFlights = this.state.planVuelos.filter(e => e.fechaLlegada <= newTime );

      for(let delElem of finishedFlights){
        let idxDel = auxIndex.get(delElem.oficinaSalida);
        auxLocationInfo[idxDel].capacidadActual += delElem.cantidad - delElem.cantidadSalida;
      }

      this.setState({
        locationInfo: auxLocationInfo,
        time: newTime,
        planVuelos: liveFlights.concat(auxPlanesNew)
      });
      //Fin
    }
    handleStartClock(){
      if(this.state.intervalClock){
        console.log(">>",this.state.intervalClock);
      }else{
        let intClock = setInterval(
          () => this.tickClock()
          ,this.frecRefreshSimu);

        let intWindowClock = setInterval(
            () => this.sendRequestActions()
            ,Math.floor(this.state.windowTime/this.state.frecTime));

        this.setState({
            intervalClock: intClock,
            intervalWindowClock: intWindowClock 
        });
      }
    }
    isCountrySelected(elem){
        return this.state.selectedCountries.includes(elem);
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
            }else{
                //Se agrega
                this.setState({
                    selectedCountries: [...this.state.selectedCountries,geo.properties.ISO_A3]
                })
                console.log("agrega",[...this.state.selectedCountries,geo.properties.ISO_A3]);
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
    render(){
        const { locationInfo, planVuelos, windowTime, frecTime } = this.state;
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
            <input type="number" value={frecTime} onChange={this.handleFrecTimeChange}/>
            <input type="number" value={windowTime} onChange={this.handleWindowTimeChange}/>
            {objTime.toLocaleString()}
            <button onClick={this.handleStartClock}>Start</button>
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
                                        <circle cx={ 0 } cy={ 0 } r={ 3 } />                              
                                    </Marker>);
                        })}
                </Markers>  
                <Lines>
                  {planVuelos.map((item,i)=>{
                    let salida =this.state.myMap.get(item.oficinaSalida);
                    let llegada=this.state.myMap.get(item.oficinaLlegada);
                    return(
                      <Line
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
            <ReactTooltip id='modal-city'
                getContent={this.getContentModalCity}
            />
            
            </TheContent>
            </Layout>
        );
    }
}

export default Simulacion;