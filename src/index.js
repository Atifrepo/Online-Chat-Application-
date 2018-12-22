import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import *as firebase from 'firebase'
var config = {
    apiKey: "AIzaSyC2zn2cUCil_rkGII29rtcJcJIuzi_KWKA",
    authDomain: "chat-room-f88bd.firebaseapp.com",
    databaseURL: "https://chat-room-f88bd.firebaseio.com",
    projectId: "chat-room-f88bd",
    storageBucket: "",
    messagingSenderId: "108611507830"
  };
   firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

