import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from './redux/reducer/index';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);
// window.addEventListener('load',() =>{
// //  fetch();
//   registerServiceWorker();
// })


// async function registerServiceWorker(){
//   if ('serviceWorker' in navigator) {
//     try{
//       await navigator.serviceWorker.register('./serviceWorker.js');
//       console.log('seviceWorker registertion successful')
//     }
//       catch (err) {
//         console.log('serviceWorker registertion failed');
//       }
//     }
//   }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();


