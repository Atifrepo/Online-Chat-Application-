import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import InputLabel from '@material-ui/core/InputLabel';
import * as firebase from 'firebase';
import AppBar from 'material-ui/AppBar/AppBar';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import '../login.css'

import Input from '@material-ui/core/Input';
const style = theme => ({
    Paper: {
        marginTop: 10, marginBottom: 10, height: 500, backgroundColor: 'inherit', position: 'relative',
        overflowY: 'auto'
    },

    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    
})

class Login extends Component {

    constructor() {
        super();
        this.state = {
            Details: {
                username: '',
                country: '',
                Age: '',
                gender: '',

            },
            token: [],
            // error: 'this is error'
        }
    }
    handleClick(event) {
        //console.log()
        firebase.database().ref('/User').push(
            {
                username: this.state.Details.username,
                country: this.state.Details.country,
                Age: this.state.Details.Age,
                gender: this.state.Details.gender
            }

        );
        if (this.state.Details.username != null) {
            this.props.history.push('/mainpage')
        }

    }


    InputChange(changeValue, event) {

        this.state.Details[changeValue] = event.target.value;
        //       console.log('event', event.target.value);
        this.setState({
            Details: this.state.Details
        });

    }
    // handleChange = event => {
    //     this.setState({ value: event.target.value });
    // };

SeletGender(event) {
    this.setState({
        gender:event.target.value
    })
    console.log(this.state.gender)
}
    render() {
        return (


            <div>
                <form>
                    <div style={{ backgroundColor: '#3F51B5' }} className="App-header">
                        <AppBar style={{ backgroundColor: '#002171' }} title='تسجيل الدخول' //login// 
                        ></AppBar>
                    </div>
                    <div align="center">
                        <Paper style={{ paddingRight: 100, marginTop: 100, height: 400, backgroundColor: '#3F51B5', width: '40%' }}>
                            <h1>انضم للمحادثه</h1>
                            
                            {/* <InputLabel>Username</InputLabel> */}
                            <OutlinedInput
                                placeholder="Enter your username"
                                id="outlined-name"
                                style={{ width: '60%' }}
                                // className={classes.textField}
                                value={this.state.username}
                                onChange={this.InputChange.bind(this, 'username')}
                                margin="normal"
                                variant="outlined"
                            />
                            <br></br>
                            <br></br>
<br></br>
                            {/* <InputLabel>Age</InputLabel> */}
                            <OutlinedInput
                                //  name="Username"
                                placeholder="Enter Age"
                                style={{ width: '60%' }}
                                value={this.state.Details.Age}
                                onChange={this.InputChange.bind(this, "Age")}
                            //errorText="This field is required!"

                            />
                            <br></br>
                            <br></br>

                            <div  style={{ width: '60%' }} className='radioButton'
                            //onChange={this.SeletGender.bind(this)}
                             > 
                            Gender
                             <input type='radio' value='Male' name='user' /> Male
                          <input type='radio' value='Female' name='user' /> Female
                        </div>
                            <br></br>


{/* <InputLabel>country</InputLabel>   */}
                            <OutlinedInput
                                //  name="Username"
                                placeholder="Enter country name"

                                value={this.state.Details.country}
                                style={{ width: '60%' }}
                                onChange={this.InputChange.bind(this, "country")}
                            //errorText="This field is required!"
                            />

                            <br></br>
<br></br>
                            <Button variant="contained" color="#E3F2FD" onClick={(event) => this.handleClick(event)}><b>login</b></Button>
               </Paper>
                    </div>
                </form>
            </div>

        )

    }

}
export default Login
