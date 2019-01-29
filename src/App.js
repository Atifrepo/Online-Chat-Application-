import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//import FabIntegrationSnackbar from './pages/chatpage'
import MainPage from './pages/Mainpage';
import Login from './pages/login';
import './App.css';
import Chat from './chat'
import Signup from './pages/Signup'
// import Theme from './pages/theme';
class App extends Component {
  render() {
    return (
<div className="backgorund">
      <MuiThemeProvider>

        <div className="App">

          {/* <div className="App-header">
          
            <h2 id="titlename">غرفة الدردشة العربية </h2>
            
          </div> */}
          <Router>
            <div>
              <Route exact path='/' component={Login} />
              <Route path='/Signup' component={Signup}/>
              <Route path='/mainpage' component={MainPage} />
              <Route path='/chat' component={Chat}/>
              {/* <Route path='/theme' component={Theme}/> */}
            </div>
          </Router>
        </div>
        
      </MuiThemeProvider>
    </div>
    );
  }
}

export default App;
