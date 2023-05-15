import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { overwriteDefaultConfig } from 'choerodon-ui/dataset';
// import defaults from 'choerodon-ui/lib/configure/default';
import App from './App';

// overwriteDefaultConfig(defaults);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
