import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import obj from './App1';
//import News from './App2';
//import News from './App3';
//import News from './App4'
//import News from './App5'
import News from './App13'
import * as serviceWorker from './serviceWorker';
//const News=obj.News;


ReactDOM.render(<News />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
