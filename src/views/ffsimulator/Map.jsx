import React from "react";
import map from "./../../utils/files/world-50m-simplified.json";
import { ComposableMap, ZoomableGroup, Geographies, Geography, Markers, Marker, Line, Lines, Annotation } from 'react-simple-maps';

const baseColor = "#3498db";

export default class Oficinas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCountries: new Set(),
            isFull: false
        }
    }

    handleGeographyClick = (geography) => {
        let key = geography.properties.ISO_A3;
        let set = this.state.selectedCountries;
        if (set.has(key)) {
            set.delete(key);
        } else {
            set.add(key);
        }
        this.setState({ ...this.state, selectedCountries: set });
    }

    render() {
        console.log('map', map);
        const { selectedCountries } = this.state;
        return (
            <ComposableMap className="mapa">
                <Geographies geography={map} disableOptimization={true}>
                    {(geographies, projection) => geographies.map((geography, index) => (
                        <Geography
                            key={index}
                            geography={geography}
                            projection={projection}
                            data-for='modal-city'
                            data-tip={JSON.stringify(geography)}
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
                                    opacity: selectedCountries.has(geography.properties.ISO_A3) ? "1" : "0.75",
                                    strokeWidth: 0.3,
                                    outline: "none",
                                },
                                pressed: {
                                    fill: baseColor,
                                    opacity: "0.75",
                                    strokeWidth: 0.3,
                                    outline: "none",
                                },
                            }}
                        />
                    ))
                    }
                </Geographies>
            </ComposableMap>

        );
    }
}
