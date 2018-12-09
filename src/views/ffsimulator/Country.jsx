import React from 'react';
import colors from './colors';
import { Geography } from 'react-simple-maps';

export default class Country extends React.PureComponent {
    render() {
        const { selected, onClick, geography, projection } = this.props;
        
        return (
            <Geography
                geography={geography}
                projection={projection}
                onClick={onClick}
                data-tip={geography.properties.ISO_A3}
                style={{
                    default: {
                        fill: colors.countries.color,
                        stroke: colors.countries.stroke,
                        opacity: selected ? "1" : "0.45",
                        strokeWidth: 0.3,
                        outline: "none",    
                    },
                    hover: {
                        fill: colors.countries.color,
                        opacity: selected ? "1" : "0.65",
                        strokeWidth: 0.3,
                        outline: "none",
                    },
                    pressed: {
                        fill: colors.countries.color,
                        opacity: "0.65",
                        strokeWidth: 0.3,
                        outline: "none",
                    },
                }}
            />
        )
        
    }
}