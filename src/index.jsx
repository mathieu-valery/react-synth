// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'

// internal modules
import App from './components/app';
import '../assets/stylesheets/application.scss';

// State and reducers
import waveformReducer from './reducers/waveform_reducer';
import cutoffReducer from './reducers/cutoff_reducer';
import canvasReducer from './reducers/canvas_reducer';

const initialState = {
  waveform: 'sine',
  cutoff: 1000,
  canvas: {}
};

const middlewares = applyMiddleware(logger);

const reducers = combineReducers({
  waveform: waveformReducer,
  cutoff: cutoffReducer,
  canvas: canvasReducer
});

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
