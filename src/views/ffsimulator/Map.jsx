import React from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Markers } from 'react-simple-maps';

import Flight from './Flight';
import Country from './Country';
import CountryTooltip from './CountryTooltip';

import config from './config';
import animations from './animations';
import { Movement } from './movements';
import { printTime } from './time';

import { Queue, PriorityQueue } from './structures';

import API from '../../Services/Api';

import map from "./../../utils/files/world-50m-simplified.json";

var movements;

var semaphore = require('semaphore')(1);

export default class SimulationMap extends React.Component {
    constructor(props) {
        super(props);
        this.composableMapRef = React.createRef();
        this.markersRef = React.createRef();
        this.state = {
            start: Date.UTC(2018, 7, 15, 0, 0, 0, 0),
            now: Date.UTC(2018, 7, 15, 0, 0, 0, 0),
            currentWindow: null,
            flights: new Set(),
            selectedCountries: new Set(),
            oficinas: new Map(),
            actions: new Queue(),
            clockIdentifier: null,
            windowIdentifier: null,
        }
    }

    startSimulation = () => {
        movements = new PriorityQueue((a, b) => a.instant !== b.instant ? a.instant - b.instant : a.type - b.type);
        let windowIdentifier = null;

        this.setState({ ...this.state, currentWindow: 0 }, () => {
            this.getWindow();
            windowIdentifier = setInterval(this.getWindow, config.simulationTimeToRealTime(config.windowSize));

            setTimeout(() => {
                setInterval(this.tickClock, config.simulationTimeToRealTime(config.refreshRate));
            }, config.simulationTimeToRealTime(config.windowSize));

            this.setState({ ...this.state, windowIdentifier: windowIdentifier })
        });

    }

    tickClock = () => {
        const { now, actions, flights, oficinas } = this.state;
        let max = now + config.refreshRate;

        console.log(`START ticking from ${printTime(now)} to ${printTime(max)}` );
        
        while (actions.head() && actions.head().fechaSalida <= max && actions.head().fechaSalida > now) {
            const action = actions.pop();
            switch (action.tipo) {
                case "SALIDA":

                    if (action.cantidad > 0){
                        movements.push(Movement.createFlightDeparture(action));
                        movements.push(Movement.createFlightArrivalEntradaPaquetes(action));
                    }

                    if (action.cantidadSalida > 0)
                        movements.push(Movement.createFlightArrivalSalidaPaquetes(action));

                    const flight = action;
                    const duration = config.simulationTimeToRealTime((flight.fechaLlegada - flight.fechaSalida) / 1000);

                    flights.add({ from: flight.oficinaLlegada, to: flight.oficinaSalida, duration: duration, end: flight.fechaLlegada });
                    break;
                case "REGISTRO":
                    movements.push(Movement.createPackage(action));
                    break;
            }
        }

        while (!movements.isEmpty() && movements.peek().instant <= max) {
            const movement = movements.pop();
            let oficina = oficinas.get(movement.where);
            switch (movement.type) {
                case Movement.ENTRADA:
                    oficina.capacidadActual += movement.qty;
                    break;
                case Movement.SALIDA:
                    oficina.capacidadActual -= movement.qty;
                    break;
            }

            if(oficina.capacidadActual > oficina.capacidadMaxima){
                console.error('Collapsed at', new Date(Date.UTC(movement.instant)), movement.where, oficina);
            }
        }

        this.setState({ ...this.state, flights: flights, now: max, oficinas: this.state.oficinas }, () => {
            console.log(`STOPP ticking from ${printTime(now)} to ${printTime(max)}` );
        });
    }

    getWindow = () => {
        const { actions, start, currentWindow } = this.state;

        let windowStart = start + currentWindow * config.windowSize;
        let windowEnd = windowStart + config.windowSize;

        let window = {
            inicio: new Date(windowStart),
            fin: new Date(windowEnd)
        }

        console.log("REQUESTING WINDOW", window);
        
        API.post('simulacion/window', window)
            .then(response => {
                if (response.data.status === 0) {
                    semaphore.take(() => {
                        actions.enqueueAll(response.data.listActions);
                        semaphore.leave();
                        this.setState({ ...this.state, currentWindow: currentWindow + 1 });
                    })
                } else {
                    clearInterval(this.state.windowIdentifier);
                    console.error("Simulation is ded");
                }

            })
            .catch(err => {
                clearInterval(this.state.windowIdentifier);
                console.error("Simulation died abrupbtly");
            })
    }

    getOficinas = () => {
        API.get('simulacion/oficinas')
            .then(response => {
                let newOficinas = new Map();
                response.data.forEach(data => {
                    let oficina = {
                        capacidadActual: 0,
                        capacidadMaxima: data.capacidadMaxima
                    }
                    newOficinas.set(data.pais.codigoIso, oficina);
                    this.state.selectedCountries.add(data.pais.codigoIso);
                })
                this.setState({ ...this.state, oficinas: newOficinas });
            })
    }

    getVuelos = () => {
        API.get('simulacion/vuelosResumidos')
            .then(response => {
                response.data.forEach(data => {
                    const from = data.substring(0, 3);
                    const to = data.substring(4, 7);
                    animations.create(from, to, this.markersRef.current.props.projection)
                })
            })
    }

    handleGeographyClick = (geography) => {
        let key = geography.properties.ISO_A3;
        let set = this.state.selectedCountries;

        if (set.has(key)) {
            set.delete(key);
        } else {
            set.add(key);
        }

        this.setState({ ...this.state });
    }

    onFlightCompleted = (flight) => {
        flight.rendered = false;
    }

    render() {
        const { flights, selectedCountries, now, oficinas } = this.state;
        return (
            <div className='wrapper'>
                <button onClick={this.getVuelos}> Vuelos </button>
                <button onClick={this.getOficinas}> Oficinas </button>
                <button onClick={this.startSimulation}> Window </button>
                <ComposableMap className="mapa" ref={this.composableMapRef}>
                    <ZoomableGroup disablePanning>
                        <Geographies ref={this.markersRef} geography={map} disableOptimization={true}>
                            {(geographies, projection) => geographies.map((geography, index) =>
                                <Country
                                    key={index}
                                    geography={geography}
                                    projection={projection}
                                    onClick={this.handleGeographyClick}
                                    selected={selectedCountries.has(geography.properties.ISO_A3)}
                                />
                            )
                            }
                        </Geographies>
                        <Markers >
                            {[...flights].map((flight, index) => flight.end >= now ? <Flight key={index} {...flight} /> : null)}
                        </Markers>
                    </ZoomableGroup>
                </ComposableMap>
                <CountryTooltip oficinas={oficinas} />
            </div>
        );
    }
}
