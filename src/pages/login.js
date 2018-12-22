import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import TextField from 'material-ui/TextField'
import Button from '@material-ui/core/Button'
import * as firebase from 'firebase';
import AppBar from 'material-ui/AppBar/AppBar';

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
    handleChange = event => {
        this.setState({ value: event.target.value });
    };


    render() {
        return (


            <div>
                <form>
                    <div>
                        <AppBar style={{ backgroundColor: '#002171' }} title='تسجيل الدخول' //login// 
                        ></AppBar>
                    </div>
<div align="center">
                    <Paper  style={{ paddingRight: 100, marginTop: 200, height: 400, backgroundColor: '#e0e0e0', width: '40%' }}>
                     <h1>Join Chat</h1>

                        <TextField

                            //  name="Username"
                            hintText="Enter username"
                            floatingLabelText="Username"
                            value={this.state.Details.username}
                            onChange={this.InputChange.bind(this, "username")}
                        //errorText="This field is required!"

                        />
                        <br></br>
                        <TextField
                            //  name="Username"
                            hintText="Enter Age"
                            floatingLabelText="Age"
                            value={this.state.Details.Age}
                            onChange={this.InputChange.bind(this, "Age")}
                        //errorText="This field is required!"

                        />
                        <br></br>
                        <label>Gender:</label>
                        <div className='radioButton' > <input type='radio' value='Male' name='user' /> Male
                          <input type='radio' value='Female' name='user' /> Female
                        </div>
                        <br></br>


                        <TextField
                            //  name="Username"
                            hintText="Enter country name"
                            floatingLabelText="Country"
                            value={this.state.Details.country}
                            onChange={this.InputChange.bind(this, "country")}
                        //errorText="This field is required!"
                        />

                        <br></br>

                        <Button variant="contained" onClick={(event) => this.handleClick(event)}><b>login</b></Button>
                    </Paper>
                    </div>
                </form>
            </div>

        )

    }

}
export default Login
