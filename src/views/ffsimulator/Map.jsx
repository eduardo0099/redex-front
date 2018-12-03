import React from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography, Markers, Marker, Line, Lines } from 'react-simple-maps';
import map from "./../../utils/files/world-50m-simplified.json";
import centers from "./../../utils/files/country-centers.json";
import Flight from './Flight';

const baseColor = "#3498db";
const avoidedCountries = new Set(["ATA", "ATF"]);

const simulationRealRatio = 300; // en 1 segundo de la vida real pasan 300 segundos en la simulacion

const realTimeToSimulationTime = (realTime) => {
    return realTime * simulationRealRatio;
}

const simulationTimeToRealTime = (simulationTime) => {
    return simulationTime / simulationRealRatio;
}

const windowInSimulationSeconds = 3600 * 5;

const windowInRealSeconds = simulationTimeToRealTime(windowInSimulationSeconds);

const flip = (toBeFlipped) => {
    return [toBeFlipped[1], toBeFlipped[0]];
}


export default class Oficinas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCountries: new Set(),
            isFull: false,
            open: true,
            flights: new Set(),
            start: 1
        }
    }

    handleMouseDown = () => {
        this.createRandomFlight();
    };

    handleGeographyClick = (geography) => {
        let key = geography.properties.ISO_A3;
        let set = this.state.selectedCountries;

        if (set.has(key)) {
            set.delete(key);
        } else {
            set.add(key);
        }

        this.setState({ ...this.state, start: this.state.start + 1 });
    }

    createRandomFlight() {
        let $react = this;
        const items = ["FR", "PE", "CA", "RU", "CN", "BR", "AR"]
        let item = items[Math.floor(Math.random() * items.length)];
        let item2 = items[Math.floor(Math.random() * items.length)];
        let d = 5 + Math.random() * 5;

        if (item !== "-99" && item2 !== "-99" && centers[item] && centers[item2]) {
            let flight = { id: Math.random().toString(36).substr(2, 9), from: item.toUpperCase(), to: item2.toUpperCase(), duration: d, rendered: true };
            $react.state.flights.add(flight);
            //setTimeout(() =>  $react.onFlightCompleted(flight), 800);
        }
        $react.setState({ ...$react.state }, () => {
            // this.createRandomFlight();
        });
    }

    onFlightCompleted(flight) {
        flight.rendered = false;
    }

    render() {
        const { selectedCountries } = this.state;
        return (
            <div>
                <button onClick={this.createRandomFlight.bind(this)}> Random flights </button>
                <div className='wrapper'>
                    <div className='map-div'>
                        <ComposableMap className="mapa">
                            <ZoomableGroup disablePanning>
                                <Geographies geography={map} disableOptimization={true}>
                                    {(geographies, projection) => geographies.map((geography, index) => {
                                        if (avoidedCountries.has(geography.properties.ISO_A3)) return null;
                                        return (
                                            <Geography
                                                key={index}
                                                geography={geography}
                                                projection={projection}
                                                onClick={this.handleGeographyClick}
                                                style={{
                                                    default: {
                                                        fill: baseColor,
                                                        stroke: "#FFFF",
                                                        opacity: selectedCountries.has(geography.properties.ISO_A3) ? "1" : "0.45",
                                                        strokeWidth: 0.3,
                                                        outline: "none",
                                                    },
                                                    hover: {
                                                        fill: baseColor,
                                                        opacity: selectedCountries.has(geography.properties.ISO_A3) ? "1" : "0.65",
                                                        strokeWidth: 0.3,
                                                        outline: "none",
                                                    },
                                                    pressed: {
                                                        fill: baseColor,
                                                        opacity: "0.65",
                                                        strokeWidth: 0.3,
                                                        outline: "none",
                                                    },
                                                }}
                                            />
                                        )
                                    })
                                    }
                                </Geographies>
                                <Markers>
                                    {[...this.state.flights].map((flight, index) => flight.rendered ? <Flight key={flight.id} {...flight} /> : null)}
                                </Markers>
                            </ZoomableGroup>
                        </ComposableMap>
                    </div>
                </div>


            </div>


        );
    }
}
