// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// internal modules
import App from './components/app';
import '../assets/stylesheets/application.scss';

// State and reducers
import waveformReducer from './reducers/waveform_reducer';
import cutoffReducer from './reducers/cutoff_reducer';

const initialState = {
  waveform: 'sine',
  cutoff: 1000
};

const reducers = combineReducers({
  waveform: waveformReducer,
  cutoff: cutoffReducer
});

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={createStore(reducers, initialState)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
