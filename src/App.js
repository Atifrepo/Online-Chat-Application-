import React, { Component } from 'react';

import{
  BrowserRouter as Router,
  Route,
  }from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//import FabIntegrationSnackbar from './pages/chatpage'
import MainPage from './pages/Mainpage';
import Login from './pages/login';
import './App.css';


class App extends Component {
  render() {
    return (
      
      <MuiThemeProvider>
        
        <div className="App">
        
          {/* <div className="App-header">
          
            <h2 id="titlename">غرفة الدردشة العربية </h2>
            
          </div> */}
     <Router>
     <div>
       <Route exact path='/' component={Login} />
        <Route path='/mainpage' component={MainPage} /> 
       </div>
     </Router>
     </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
