import React from 'react';
import { Marker } from 'react-simple-maps';
import countryCenters from "../../utils/files/country-centers";

//if we decide to use planes instead of dots 
//const planePath = "m25.21488,3.93375c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0z";
//still needs to be improved tho
const SCALE = 1;

const calculateDisplacement = (from, to) => {
    return { x: (to[0] - from[0]) * 1 / SCALE, y: (to[1] - from[1]) * 1 / SCALE };
}

const flip = (toBeFlipped) => {
    return [toBeFlipped[1], toBeFlipped[0]];
}

export default class Flight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animationName: ""
        }
    }

    componentWillMount() {
        const { from, to, projection, id } = this.props;
        let styleSheet = document.styleSheets[0];
        const displacement = calculateDisplacement(projection(flip(countryCenters[from])), projection(flip(countryCenters[to])));
        let animationName = `animation${id}`;
        let keyframes =
            `@-webkit-keyframes ${animationName} {
            100% {-webkit-transform:translate(${displacement.x}px, ${displacement.y}px)}
        }`;
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        this.setState({
            animationName: animationName
        });
    }

    printInfo = () => {
        const { from, to } = this.props;
        console.log('props', this.props);
        console.log('from',countryCenters[from]);
        console.log('to', countryCenters[to]);
    }

    render() {
        const { duration, from } = this.props;

        let style = {
            animationName: this.state.animationName,
            animationTimingFunction: 'ease-in-out',
            animationDuration: `${duration}s`,
            animationDelay: '0.0s',
            animationIterationCount: 1,
            animationDirection: 'normal',
            animationFillMode: 'forwards'
        };

        return (
            <Marker
                {...this.props}
                marker={{ coordinates: flip(countryCenters[from]) }}
                preserveMarkerAspect={true}
                style={{ default: { fill: "#000" } }}
                onClick={this.printInfo}
            >
                <g transform={`scale(${SCALE})`} >
                    <circle r={2} className={this.state.className} style={style} />
                </g>
            </Marker>
        )
    }
}