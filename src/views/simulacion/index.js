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
            indexLoc: null,
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
    }
    //Lectura de data cada minuto
    componentDidMount(){
      //this.loadData();
      //setInterval(this.loadData,2);
    }

    loadData(){
      try{
        let minus = this.state.num -1
        this.setState({
          num: minus
        })
        console.log("llamada",this.state.num);
        /*this.setState({
        planVuelos:[]
        })*/
      }catch(e){
        console.log(e);
      }
    }

    componentWillMount(){
      API.get('/simulacion/1/acciones/all').then(resp => {
        this.listActions = resp.data;
        console.log(">",this.listActions);
      });
        let response = [
            {
              "id": 1,
              "capacidadActual": 0,
              "capacidadMaxima": 250,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "SPIM",
              "pais": {
                "codigo": "SPIM",
                "nombre": "Perú",
                "codigoIso": "PER",
                "latitud": -12.04,
                "longitud": -77.03,
                "id": 8
              }
            },
            {
              "id": 11,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "SKBO",
              "pais": {
                "codigo": "SKBO",
                "nombre": "Colombia",
                "codigoIso": "COL",
                "latitud": 4.61,
                "longitud": -74.08,
                "id": 5
              }
            },
            {
              "id": 21,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "SEQM",
              "pais": {
                "codigo": "SEQM",
                "nombre": "Ecuador",
                "codigoIso": "ECU",
                "latitud": -0.23,
                "longitud": -78.52,
                "id": 6
              }
            },
            {
              "id": 31,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "SVMI",
              "pais": {
                "codigo": "SVMI",
                "nombre": "Venezuela",
                "codigoIso": "VEN",
                "latitud": 10.49,
                "longitud": -66.88,
                "id": 10
              }
            },
            {
              "id": 41,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "SBBR",
              "pais": {
                "codigo": "SBBR",
                "nombre": "Brasil",
                "codigoIso": "BRA",
                "latitud": -15.78,
                "longitud": -47.93,
                "id": 3
              }
            },
            {
              "id": 51,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "SLLP",
              "pais": {
                "codigo": "SLLP",
                "nombre": "Bolivia",
                "codigoIso": "BOL",
                "latitud": -16.5,
                "longitud": -68.15,
                "id": 2
              }
            },
            {
              "id": 61,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "SCEL",
              "pais": {
                "codigo": "SCEL",
                "nombre": "Chile",
                "codigoIso": "CHL",
                "latitud": -33.46,
                "longitud": -70.65,
                "id": 4
              }
            },
            {
              "id": 71,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "SABE",
              "pais": {
                "codigo": "SABE",
                "nombre": "Argentina",
                "codigoIso": "ARG",
                "latitud": -34.61,
                "longitud": -58.37,
                "id": 1
              }
            },
            {
              "id": 81,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "SGAS",
              "pais": {
                "codigo": "SGAS",
                "nombre": "Paraguay",
                "codigoIso": "PRY",
                "latitud": -25.3,
                "longitud": -57.64,
                "id": 7
              }
            },
            {
              "id": 91,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "SUAA",
              "pais": {
                "codigo": "SUAA",
                "nombre": "Uruguay",
                "codigoIso": "URY",
                "latitud": -34.9,
                "longitud": -56.19,
                "id": 9
              }
            },
            {
              "id": 101,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LATI",
              "pais": {
                "codigo": "LATI",
                "nombre": "Albania",
                "codigoIso": "ALB",
                "latitud": 41.33,
                "longitud": 19.82,
                "id": 11
              }
            },
            {
              "id": 111,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "EDDI",
              "pais": {
                "codigo": "EDDI",
                "nombre": "Alemania",
                "codigoIso": "DEU",
                "latitud": 52.52,
                "longitud": 13.41,
                "id": 12
              }
            },
            {
              "id": 121,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LOWW",
              "pais": {
                "codigo": "LOWW",
                "nombre": "Austria",
                "codigoIso": "AUT",
                "latitud": 48.21,
                "longitud": 16.37,
                "id": 13
              }
            },
            {
              "id": 131,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "EBCI",
              "pais": {
                "codigo": "EBCI",
                "nombre": "Belgica",
                "codigoIso": "BEL",
                "latitud": 50.85,
                "longitud": 4.35,
                "id": 14
              }
            },
            {
              "id": 141,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "UMMS",
              "pais": {
                "codigo": "UMMS",
                "nombre": "Bielorrusia",
                "codigoIso": "BLR",
                "latitud": 53.9,
                "longitud": 27.57,
                "id": 15
              }
            },
            {
              "id": 151,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LBSF",
              "pais": {
                "codigo": "LBSF",
                "nombre": "Bulgaria",
                "codigoIso": "BGR",
                "latitud": 42.7,
                "longitud": 23.32,
                "id": 16
              }
            },
            {
              "id": 161,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LKPR",
              "pais": {
                "codigo": "LKPR",
                "nombre": "Checa",
                "codigoIso": "CZE",
                "latitud": 50.09,
                "longitud": 14.42,
                "id": 17
              }
            },
            {
              "id": 171,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LDZA",
              "pais": {
                "codigo": "LDZA",
                "nombre": "Croacia",
                "codigoIso": "HRV",
                "latitud": 45.81,
                "longitud": 15.98,
                "id": 18
              }
            },
            {
              "id": 181,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "EKCH",
              "pais": {
                "codigo": "EKCH",
                "nombre": "Dinamarca",
                "codigoIso": "DNK",
                "latitud": 55.68,
                "longitud": 12.57,
                "id": 19
              }
            },
            {
              "id": 191,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LZIB",
              "pais": {
                "codigo": "LZIB",
                "nombre": "Eslovaquia",
                "codigoIso": "SVK",
                "latitud": 48.15,
                "longitud": 17.11,
                "id": 20
              }
            },
            {
              "id": 201,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LJLJ",
              "pais": {
                "codigo": "LJLJ",
                "nombre": "Eslovenia",
                "codigoIso": "SVN",
                "latitud": 46.05,
                "longitud": 14.51,
                "id": 21
              }
            },
            {
              "id": 211,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LEMD",
              "pais": {
                "codigo": "LEMD",
                "nombre": "España",
                "codigoIso": "ESP",
                "latitud": 40.42,
                "longitud": -3.7,
                "id": 22
              }
            },
            {
              "id": 221,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "EETN",
              "pais": {
                "codigo": "EETN",
                "nombre": "Estonia",
                "codigoIso": "EST",
                "latitud": 59.44,
                "longitud": 24.75,
                "id": 23
              }
            },
            {
              "id": 231,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "EFHK",
              "pais": {
                "codigo": "EFHK",
                "nombre": "Finlandia",
                "codigoIso": "FIN",
                "latitud": 60.17,
                "longitud": 24.94,
                "id": 24
              }
            },
            {
              "id": 241,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LFPG",
              "pais": {
                "codigo": "LFPG",
                "nombre": "Francia",
                "codigoIso": "FRA",
                "latitud": 48.85,
                "longitud": 2.35,
                "id": 25
              }
            },
            {
              "id": 251,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LGAV",
              "pais": {
                "codigo": "LGAV",
                "nombre": "Grecia",
                "codigoIso": "GRC",
                "latitud": 37.98,
                "longitud": 23.72,
                "id": 26
              }
            },
            {
              "id": 261,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "EHAM",
              "pais": {
                "codigo": "EHAM",
                "nombre": "Holanda",
                "codigoIso": "NLD",
                "latitud": 52.37,
                "longitud": 4.89,
                "id": 27
              }
            },
            {
              "id": 271,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LHBP",
              "pais": {
                "codigo": "LHBP",
                "nombre": "Hungría",
                "codigoIso": "HUN",
                "latitud": 47.5,
                "longitud": 19.04,
                "id": 28
              }
            },
            {
              "id": 281,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "EIDW",
              "pais": {
                "codigo": "EIDW",
                "nombre": "Irlanda",
                "codigoIso": "IRL",
                "latitud": 53.33,
                "longitud": -6.25,
                "id": 29
              }
            },
            {
              "id": 291,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "BIKF",
              "pais": {
                "codigo": "BIKF",
                "nombre": "Islandia",
                "codigoIso": "ISL",
                "latitud": 64.14,
                "longitud": -21.9,
                "id": 30
              }
            },
            {
              "id": 301,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LIRA",
              "pais": {
                "codigo": "LIRA",
                "nombre": "Italia",
                "codigoIso": "ITA",
                "latitud": 41.89,
                "longitud": 12.51,
                "id": 31
              }
            },
            {
              "id": 311,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "EVRA",
              "pais": {
                "codigo": "EVRA",
                "nombre": "Letonia",
                "codigoIso": "LVA",
                "latitud": 56.95,
                "longitud": 24.11,
                "id": 32
              }
            },
            {
              "id": 321,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "ELLX",
              "pais": {
                "codigo": "ELLX",
                "nombre": "Luxemburgo",
                "codigoIso": "LUX",
                "latitud": 49.61,
                "longitud": 6.13,
                "id": 33
              }
            },
            {
              "id": 331,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LMML",
              "pais": {
                "codigo": "LMML",
                "nombre": "Malta",
                "codigoIso": "MLT",
                "latitud": 35.9,
                "longitud": 14.51,
                "id": 34
              }
            },
            {
              "id": 341,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "ENGM",
              "pais": {
                "codigo": "ENGM",
                "nombre": "Noruega",
                "codigoIso": "NOR",
                "latitud": 59.91,
                "longitud": 10.75,
                "id": 35
              }
            },
            {
              "id": 351,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "EPMO",
              "pais": {
                "codigo": "EPMO",
                "nombre": "Polonia",
                "codigoIso": "POL",
                "latitud": 52.23,
                "longitud": 21.01,
                "id": 36
              }
            },
            {
              "id": 361,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LPPT",
              "pais": {
                "codigo": "LPPT",
                "nombre": "Portugal",
                "codigoIso": "PRT",
                "latitud": 38.72,
                "longitud": -9.13,
                "id": 37
              }
            },
            {
              "id": 371,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "EGLL",
              "pais": {
                "codigo": "EGLL",
                "nombre": "Reino Unido",
                "codigoIso": "GBR",
                "latitud": 51.51,
                "longitud": -0.13,
                "id": 38
              }
            },
            {
              "id": 381,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "ESKN",
              "pais": {
                "codigo": "ESKN",
                "nombre": "Suecia",
                "codigoIso": "SWE",
                "latitud": 59.33,
                "longitud": 18.06,
                "id": 39
              }
            },
            {
              "id": 391,
              "capacidadActual": 0,
              "capacidadMaxima": 100,
              "estado": {
                "name": "ACTIVO"
              },
              "codigo": "LSZB",
              "pais": {
                "codigo": "LSZB",
                "nombre": "Suiza",
                "codigoIso": "CHE",
                "latitud": 46.95,
                "longitud": 7.45,
                "id": 40
              }
            }
          ];
        let selectedCountries = [];
        for(let loc of response){
            selectedCountries.push(loc.pais.codigoIso);
        }
        setTimeout(()=>{
            ReactTooltip.rebuild()
        },100)
        //Se genera una Map donde se almacenan oficina y coordenada
        let aux = [];
        let mapIndexLoc = new Map();
        for (let i = 0; i < response.length; i++) {
            let obj = [];
            obj.push(response[i].pais.codigoIso);
            obj.push(response[i]);
            mapIndexLoc.set(response[i].pais.codigoIso,i);
            aux.push(obj);
        }
        
        console.log("kha?",mapIndexLoc);
        this.setState({
            indexLoc: mapIndexLoc,
            myMap:new Map(aux),
            locationInfo: response,
            selectedCountries: selectedCountries
        })
        console.log("Hash-did",this.state.myMap);
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
    tickClock(){
      let oldTime = this.state.time;
      let newTime = this.state.time + this.frecRefreshSimu*this.state.frecTime;
      //Ini: Calculos que se deben hacer por cada tick del reloj
      let auxLocationInfo = [...this.state.locationInfo];
      let auxIndex = this.state.indexLoc;
      let esTemprano = true;
      let obj;
      let indObj;
      while(this.listActions.length != 0 && esTemprano){
        if(this.listActions[0].fechaSalida < this.state.time){
          obj = this.listActions.shift();

          if(obj.tipo == "REGISTRO"){
            let idx = auxIndex.get(obj.oficinaLlegada);
            auxLocationInfo[idx].capacidadActual++;
            console.log("asssa");
          }else if(obj.tipo == "SALIDA"){

          }
        }else{
          esTemprano = false;
        }
      }



      this.setState({
        locationInfo: auxLocationInfo,
        time: newTime
      });
        /*
        {
          "id": 1,
          "capacidadActual": 0,
          "capacidadMaxima": 250,
          "estado": {
            "name": "ACTIVO"
          },
          "codigo": "SPIM",
          "pais": {
            "codigo": "SPIM",
            "nombre": "Perú",
            "codigoIso": "PER",
            "latitud": -12.04,
            "longitud": -77.03,
            "id": 8
          }
        },
        */
      //Fin
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
        const { locationInfo,planVuelos } = this.state;
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