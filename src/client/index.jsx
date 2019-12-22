import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Heatmap from './containers/Heatmap';
import MonthHeader from './containers/MonthHeader';
import heatmap2 from './reducers/index';

import './style/style.css';

const heatmap = (state) => state;

const store = createStore(heatmap2);
const App = () => (
  <div>
    <MonthHeader />
    <Heatmap />
  </div>
);
const reactWrapper = document.getElementById('app');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  reactWrapper,
);
