import React, { Component } from 'react';
import { Layout ,Select,Button} from 'antd';
import Tooltip from "react-simple-tooltip"
import { TheContent, TheHeader } from '../../components/layout';
import { ComposableMap,ZoomableGroup,Geographies,Geography,
       Markers,
       Marker,
       Line,
       Lines
         } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
//Imagen del mapa
import map from "./../../utils/files/world-50m-simplified.json";
import locAlm from './../../utils/files/locations.json';
import Modal from './Modal';
const Option = Select.Option;
class Simulacion extends Component{
    constructor(props) {
        super(props);
        this.locationInfo = [
            {
                "idContinente":2,
                "city":"Buenos Aires",
                "country":"Argentina",
                "code":"SABE",
                "isoCode":"ARG",
                "longitude":-58.3712,
                "latitude":-34.6083,
                "capacidad":[{name:'capacidadActual',value:50},{name:'capacidadMaxima',value:500}],
                
            },
            {
                "idContinente":2,
                "city":"Lima",
                "country":"Perú",
                "code":"SPIM",
                "isoCode":"PER",
                "longitude":-77.02824,
                "latitude":-12.04318,
                "capacidad":[{name:'capacidadActual',value:50},{name:'capacidadMaxima',value:500}],
               
            },
            {
                "idContinente":2,
                "city":"La Paz",
                "country":"Bolivia",
                "code":"SLLP",
                "isoCode":"BOL",
                "longitude":-68.1500015,
                "latitude":-16.5,
                "capacidad":[{name:'capacidadActual',value:50},{name:'capacidadMaxima',value:500}],
                
            },
            {
                "idContinente":2,
                "city":"Brasilia",
                "country":"Brasil",
                "code":"SBBR",
                "isoCode":"BRA",
                "longitude":-47.9292,
                "latitude":-15.7801,
                "capacidad":[{name:'capacidadActual',value:50},{name:'capacidadMaxima',value:500}],
                
            },
            {
                "idContinente":4,
                "city":"Madrid",
                "country":"España",
                "code":"LEMD",
                "isoCode":"ESP",
                "longitude":-3.70256,
                "latitude":40.4165,
                "capacidad":[{name:'capacidadActual',value:50},{name:'capacidadMaxima',value:500}],
                
            }  
        ];
        
        this.locAlm = locAlm;
        this.cont = 0;
        this.state = {
            center: [0,20],
            zoom: 1,
            tooltipConfig: null,
        }
        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getLocationDef = this.getLocationDef.bind(this);
        this.buildCurves = this.buildCurves.bind(this);
        //Zoom the city
        this.handleCitySelection = this.handleCitySelection.bind(this)
        this.handleReset = this.handleReset.bind(this)
        //Tooltip handmade
        this.disableDiv = this.disableDiv.bind(this);
        this.enableDiv = this.enableDiv.bind(this);
        this.handleModalContent = this.handleModalContent.bind(this);
    }

    componentDidMount(){
        setTimeout(()=>{
            ReactTooltip.rebuild()
        },100)
    }
    //Tooltip handmade
    disableDiv() {
        this.setState({
           detalle:'none'
        });
    }
    
    enableDiv=(item) =>{
        
    }

    //ZOOM the city
    handleCitySelection=(e)=> {
        console.log("Para hacer zoom",e)
        this.setState({
          center: [e.key.longitude,e.key.latitude],
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
    getLocationDef(obj){
        let objLoc = this.locAlm.find(e => e.isoCode == obj.properties.ISO_A3);
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
        console.log("rererere",geo);
        return <h1>{geo.properties.NAME}</h1>;
    }
    render(){
        const { tooltipConfig } = this.state;
        var divStyle = {
            display:this.state.disableDiv?'block':'none'
        };
        return(
            <Layout>
            <TheHeader>
                <h1> Simulación </h1>
            </TheHeader>
            <TheContent>
            <div >
                <Select labelInValue={true} style={{width:"50%"}} onChange={this.handleCitySelection}>
                        {this.locationInfo.map(i=>(
<<<<<<< HEAD
                            <Option key={i.codigoIso} value={i} >
=======
                            <Option key={i.idContinente} value={i.city} >
>>>>>>> ee9f862376708d4b3d3a437d7e7a05ee6c4b91c4
                            {i.city}
                            </Option>
                        ))}
                </Select>
            <Button onClick={this.handleReset}>
                { "Reset" }
            </Button>
            </div>
            <Button>Vuelos</Button>
            <Button>Almacenes</Button>
            <ComposableMap
                        projectionConfig={{
                            scale: 165,
                            rotation: [-10,0,0],
                    }}>
                <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
                <Geographies geography={map}>
                    {(geographies, projection) => geographies.map((geography,index) => (
                    <Geography
                        key={index}
                        geography={geography}
                        projection={projection}
                        data-for='modal-city'
                        data-tip={JSON.stringify(geography)}
                        style={{
                        default: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                        },
                        hover: {
                            fill: "#607D8B",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                        },
                        pressed: {
                            fill: "#FF5722",
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
                        {this.locationInfo.map((item, i) => { 
                            return (
                                    <Marker key={i} 
                                            marker={{ coordinates: [ item.longitude, item.latitude ] }}
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
                </ZoomableGroup>
            </ComposableMap>
            <ReactTooltip id='modal-city'
                getContent={function(item){
                        if(item){
                            let elem = JSON.parse(item);
                            console.log(elem);
                            
                            return (
                                <div>{elem.properties.ISO_A3}<div>Capacidad: 500</div></div>
                                )
                        }
                            
                    } 
                }
            />
            </TheContent>
            </Layout>
        );
    }
}

export default Simulacion;