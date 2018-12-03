import React from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography, Markers } from 'react-simple-maps';
import map from "./../../utils/files/world-50m-simplified.json";
import centers from "./../../utils/files/country-centers.json";
import Flight from './Flight';

const baseColor = "#3498db";
const avoidedCountries = new Set(["ATA", "ATF"]);

export default class Oficinas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCountries: new Set(),
            flights: new Set()
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

    createRandomFlight = () => {
        const items = ["FR", "PE", "CA", "RU", "CN", "BR", "AR"]
        let item = items[Math.floor(Math.random() * items.length)];
        let item2 = items[Math.floor(Math.random() * items.length)];
        let d = 1 + Math.random() * 3;

        if (item !== "-99" && item2 !== "-99" && centers[item] && centers[item2]) {
            let flight = { id: Math.random().toString(36).substr(2, 9), from: item.toUpperCase(), to: item2.toUpperCase(), duration: d, rendered: true };
            this.state.flights.add(flight);
        }

        this.setState({ ...$react.state });
    }

    onFlightCompleted = (flight) => {
        flight.rendered = false;
    }

    render() {
        const { selectedCountries } = this.state;
        return (
            <div>
                <button onClick={this.createRandomFlight}> Random flight </button>
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
