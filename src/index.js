import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Welcome from './welcome';

ReactDOM.render(
    <Welcome name="deejay"/>,
    document.getElementById('root')
);