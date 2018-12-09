import React from 'react';
import ReactTooltip from "react-tooltip";
import info from '../../utils/files/country-centers.json';

export default class CountryTooltip extends React.PureComponent {
  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)
  }

  getContentModalCity = (item) => {
    const { oficinas } = this.props;

    if (item) {
      const basicInfo = info[item];
      if (basicInfo) {
        if (oficinas.has(item)) {
          const oficina = oficinas.get(item);
          return (
            <div>{basicInfo.name}
              <div>{"Capacidad: " + oficina.capacidadActual + "/" + oficina.capacidadMaxima}</div>
            </div>
          )
        } else {
          return basicInfo.name;
        }
      }
    }
    return "";
  }

  render() {
    return <ReactTooltip getContent={this.getContentModalCity} />
  }
}