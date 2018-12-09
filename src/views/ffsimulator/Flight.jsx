import React from 'react';
import { Marker } from 'react-simple-maps';
import animations from './animations';

export default class Flight extends React.PureComponent {

    render() {
        const { duration, from, to } = this.props;

        let style = {
            animationName: `animation-${from}-${to}`,
            animationTimingFunction: 'linear',
            animationDuration: `${duration}s`,
            animationDelay: '0.0s',
            animationIterationCount: 1,
            animationDirection: 'normal',
            animationFillMode: 'forwards'
        };

        return (
            <Marker
                {...this.props}
                marker={{ coordinates: animations.getCoordinates(from) }}
                preserveMarkerAspect={true}
                style={{ default: { fill: "#000" } }}
            >
                <g transform={`scale(${animations.SCALE})`} >
                    <circle r={0.5} style={style} />
                </g>
            </Marker>
        )
    }
}