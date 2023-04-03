import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { overwriteDefaultConfig } from 'choerodon-ui/dataset';
import defaults from 'choerodon-ui/lib/configure/default';

overwriteDefaultConfig(defaults);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

