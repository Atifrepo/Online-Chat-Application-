import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import * as firebase from 'firebase';
import AppBar from 'material-ui/AppBar/AppBar';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import '../login.css'
import Signup from './Signup'
import backgrbund from '../background.jpg'

class Login extends Component {

    constructor() {
        super();
        this.state = {
            Details: {
                Email:'',
                password:'',
                username: '',
                country: '',
                Age: '',
                gender: '',

            },
           
           
            error: 'this is error'
        }
       
    }
    handleClick(event) {
        firebase.auth().signInWithEmailAndPassword(this.state.Details.Email,this.state.Details.password).then((error)=> {
          // Handle Errors here.
           var typeCheck;
            var userId = firebase.auth().currentUser.uid;
            this.setState({userId:userId})
            const rootRef= firebase.database().ref();
            const speedRef = rootRef.child('Users/'+userId);
            speedRef.on('value',snap => {
            //  typeCheck=snap.val().Email;
             console.log('email',speedRef);
             if(this.state.Details.Email==='admin@gmail.com'){
               this.props.history.push('/signup');
             }
           else{
              this.props.history.push('/mainpage');
           }
            
         
        })
            
        
        })
        // .catch((error)=>{
        // var errorCode = error.code;
        //   var errorMessage = error.message;
        //   console.log("err",errorCode);
           
        // });
          
           
          }
    InputChange(changeValue, event) {

        this.state.Details[changeValue] = event.target.value;
        //       console.log('event', event.target.value);
        this.setState({
            Details: this.state.Details
        });

    }


    render() {
        return (
            <div>

                <form>
                    <div style={{ backgroundColor: '#757575' }} className="App-header">
                        <AppBar style={{ backgroundColor: '#616161' }} title='تسجيل الدخول' //login// 
                        ></AppBar>
                    </div>
                    <div align="center">
                    
                        <Paper style={{ paddingRight: 100, marginTop: 100, height: 300, backgroundColor: '#616161', width: '40%' }}>
                            <h1>انضم للمحادثه</h1>
                           
                            {/* <InputLabel>Username</InputLabel> */}
                            <OutlinedInput
                                placeholder="Enter your email"
                                id="outlined-name"
                                style={{ width: '60%' }}
                                // className={classes.textField}
                                value={this.state.Details.Email}
                                onChange={this.InputChange.bind(this, 'Email')}
                                margin="normal"
                                variant="outlined"
                            />
                            <br></br>
                            <br></br>
<br></br>
                            {/* <InputLabel>Age</InputLabel> */}
                            <OutlinedInput
                                //  name="Username"
                                placeholder="Enter password"
                                style={{ width: '60%' }}
                                value={this.state.Details.password}
                                onChange={this.InputChange.bind(this, "password")}
                            //errorText="This field is required!"

                            />
                            <br></br>
                            <br></br>

                           
                            <Button variant="contained" color="#E3F2FD" onClick={(event) => this.handleClick(event)}><b>login</b></Button>
               
               <Link to={{
                        pathname: '/Signup',
                        data: this.state.Details


                    }}>
                    <Button variant="contained" color="#E3F2FD">Not a user?</Button>
                    </Link>
               </Paper>
                    </div>
                </form>
            </div>

        )

    }

}
export default Login
