/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import './styles/scss/main.scss';
import * as bootstrap from 'bootstrap';

import { createRoot } from 'react-dom/client';
/* eslint-enable */
const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App />);
