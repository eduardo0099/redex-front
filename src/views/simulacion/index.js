import React, { Component } from 'react';
import { Layout } from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import { ComposableMap,ZoomableGroup,Geographies,Geography,
       Markers,
       Marker,
       Line,
       Lines
         } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip'
//Imagen del mapa
import map from "./../../utils/files/world-50m-simplified.json";
import locAlm from './../../utils/files/locations.json';
import Modal from './Modal';

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
                "latitude":-34.6083
            },
            {
                "idContinente":2,
                "city":"Lima",
                "country":"Perú",
                "code":"SPIM",
                "isoCode":"PER",
                "longitude":-77.02824,
                "latitude":-12.04318
            },
            {
                "idContinente":2,
                "city":"La Paz",
                "country":"Bolivia",
                "code":"SLLP",
                "isoCode":"BOL",
                "longitude":-68.1500015,
                "latitude":-16.5
            },
            {
                "idContinente":2,
                "city":"Brasilia",
                "country":"Brasil",
                "code":"SBBR",
                "isoCode":"BRA",
                "longitude":-47.9292,
                "latitude":-15.7801
            },
            {
                "idContinente":4,
                "city":"Madrid",
                "country":"España",
                "code":"LEMD",
                "isoCode":"ESP",
                "longitude":-3.70256,
                "latitude":40.4165
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
    }
    //ZOOM the city
    handleCitySelection=(evt)=> {
        console.log("Para hacer zoom",evt)
        this.setState({
          center: [evt.longitude,evt.latitude],
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

    render(){
        const { tooltipConfig } = this.state;
        const tooltip = (
            <ReactTooltip id="tooltip" offset={{top:-58.3712,left:-34.6083}}>
              <strong>Holy guacamole!</strong>
            </ReactTooltip>
          );
        return(
            <Layout>
            <TheHeader>
                <h1> Simulación </h1>
            </TheHeader>
            <TheContent>
            <div >
            {
                this.locationInfo.map((item, i) => (
                <button
                    key={item}
                    className="btn px1"
                    data-city={item}
                    onClick={()=>this.handleCitySelection(item)}
                    >
                    { item.city }
                </button>
                ))
            }
            <button onClick={this.handleReset}>
                { "Reset" }
            </button>
            </div>
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
                        onMouseMove={this.handleMove}
                        onMouseLeave={this.handleLeave}
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
                            return (<Marker key={i} 
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
            </TheContent>
            </Layout>
        );
    }
}

export default Simulacion;