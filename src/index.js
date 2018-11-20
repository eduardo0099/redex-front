import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Simulacion from './views/simulacion/index';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Simulacion />, document.getElementById('root'));

serviceWorker.unregister();
