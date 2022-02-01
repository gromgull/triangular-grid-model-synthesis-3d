import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
	<h1>Click or press/hold space! (r to restart, move camera with the mouse)</h1>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
