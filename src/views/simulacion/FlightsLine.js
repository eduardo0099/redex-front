import React, { Component } from 'react';
import{Line,Lines} from 'react-simple-maps';


class FlightsLine extends Component{
    constructor(props){
        super(props);
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

    render(){
        //const {infoVuelos} = this.props;
        return(<div>
            <Lines>
                <Line
                    className="world-map-arc"
                    line={{
                            coordinates: {
                                start: [-58.3712,-34.6083],
                                end: [-3.70256, 40.4165]
                            }
                    }}
                    preserveMarkerAspect={false}
                    buildPath={this.buildCurves}
                    style={{
                        default: { stroke: "#666" },
                        hover:   { stroke: "#999" },
                        pressed: { stroke: "#000" },
                      }}
                />
            </Lines>
            </div> 
        )
    }
}

export default FlightsLine;