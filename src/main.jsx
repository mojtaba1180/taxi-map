
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapProvider } from 'react-map-gl';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './store/store';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <MapProvider>
        <App />
      </MapProvider>
    </Provider>
  </React.StrictMode>,
)
