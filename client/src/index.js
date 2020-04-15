import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import App from './app';
import * as serviceWorker from './service-worker';

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
