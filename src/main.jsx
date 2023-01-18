
import { createEmotionCache, MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapProvider } from 'react-map-gl';
import { Provider } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import App from './App';
import './index.css';
import { store } from './store/store';

const rtlCache = createEmotionCache({
  key: 'mantine-rtl',
  stylisPlugins: [rtlPlugin],
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store} >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={rtlCache}
        theme={{ dir: 'rtl' }}
      >
        <MapProvider>
          <App />
        </MapProvider>
      </MantineProvider>
    </Provider>
  // </React.StrictMode>
  ,
)
