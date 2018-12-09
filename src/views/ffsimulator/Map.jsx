import React from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Markers } from 'react-simple-maps';

import Flight from './Flight';
import Country from './Country';
import CountryTooltip from './CountryTooltip';

import config from './config';
import animations from './animations';
import { Movement } from './movements';

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
            start: new Date(2018, 7, 15, 0, 0, 0, 0).getTime(),
            now: new Date(2018, 7, 15, 0, 0, 0, 0).getTime(),
            currentWindow: null,
            flights: new Set(),
            selectedCountries: new Set(),
            oficinas: new Map(),
            actions: new Queue(),
            clockIdentifier: null,
            windiwIdentifier: null,
        }
    }

    startSimulation = () => {
        movements = new PriorityQueue((a, b) => a.instant !== b.instant ? a.instant - b.instant : a.type - b.type);
        this.setState({ ...this.state, currentWindow: 0 }, () => {
            this.getWindow();
            //setInterval(this.getWindow, config.simulationTimeToRealTime(config.windowSize));
            /*
            setTimeout(() => {
                setInterval(this.tickClock, config.simulationTimeToRealTime(config.refreshRate));
            }, config.simulationTimeToRealTime(config.windowSize));
            */
        });

    }

    tickClock = () => {
        const { now, actions, flights } = this.state;
        let max = now + config.refreshRate;

        while (actions.head() && actions.head().fechaSalida <= max && actions.head().fechaSalida > now) {
            const action = actions.pop();
            switch (action.tipo) {
                case "SALIDA":
                    movements.push(Movement.createFlightDeparture(action));
                    if (action.cantidadSalida > 0)
                        movements.push(Movement.createFlightArrival(action));

                    const flight = action;
                    const duration = config.simulationTimeToRealTime((flight.fechaLlegada - flight.fechaSalida) / 1000);
                    flights.add({ from: flight.oficinaLlegada, to: flight.oficinaSalida, duration: duration, end: flight.fechaLlegada });
                    break;
                case "ENTRADA":
                    movements.push(Movement.createPackage(action));
                    break;
            }
        }

        this.setState({ ...this.state, flights: flights, now: max });
    }

    getWindow = () => {
        const { actions, start, currentWindow } = this.state;

        let windowStart = start + currentWindow * config.windowSize;
        let windowEnd = windowStart + config.windowSize;

        let window = {
            inicio: new Date(windowStart),
            fin: new Date(windowEnd)
        }

        API.post('simulacion/window', window)
            .then(response => {
                if (response.data.status === 0) {
                    semaphore.take(() => {
                        actions.enqueueAll(response.data.listActions);
                        semaphore.leave();
                        this.setState({ ...this.state, currentWindow: currentWindow + 1 }, () => this.getWindow());
                    })
                } else {
                    console.error("Simulation is ded");
                }

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
