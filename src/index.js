import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { overwriteDefaultConfig } from 'choerodon-ui/dataset';
import defaults from 'choerodon-ui/lib/configure/default';

overwriteDefaultConfig(defaults);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

      <BrowserRouter>
        <App />
      </BrowserRouter>

);
