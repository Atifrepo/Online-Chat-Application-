import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import * as firebase from 'firebase';

import AppBar from 'material-ui/AppBar/AppBar';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import '../login.css'

class Signup extends Component{
    constructor(){
        super();
        this.state = {
            Details: {
                Email:'',
                username: '',
                country: '',
                age: '',
                gender: '',
                password:'',

            },
           
    }
}
handleClick(event){
    firebase.auth().createUserWithEmailAndPassword(this.state.Details.Email,this.state.Details.password).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
    }).then(() => {
         var userid=firebase.auth().currentUser.uid
        console.log(this.state.Details);
    firebase.database().ref('Users/'+userid).set({
        ...this.state.Details,
        Email:this.state.Details.Email,
        username:this.state.Details.username,
        password:this.state.Details.password,
        age:this.state.Details.age,
        gender:this.state.Details.gender,
        uid:userid,
    })
    
    })
    

}

InputChange(changeValue, event) {

    this.state.Details[changeValue] = event.target.value;
    //       console.log('event', event.target.value);
    this.setState({
        Details: this.state.Details
    });

}
SeletGender(event) {
    this.setState({
        gender:event.target.value
    })
    console.log(this.state.gender)
}
render(){
    return(
        <div>
        <form>
            <div style={{ backgroundColor: '#3F51B5' }} className="App-header">
                <AppBar style={{ backgroundColor: '#002171' }} title='تسجيل الدخول' //login// 
                ></AppBar>
            </div>
            <div align="center">
            
                <Paper style={{ paddingRight: 100, marginTop: 50, height:520, backgroundColor: '#3F51B5', width: '40%' }}>
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
                        placeholder="Choose Passowrd"
                        style={{ width: '60%' }}
                        value={this.state.Details.password}
                        onChange={this.InputChange.bind(this, "password")}
                    //errorText="This field is required!"

                    />
                    <br></br>
                    <br></br>

                    <div  style={{ width: '60%' }} className='radioButton'
                    value={this.state.gender}
                    onChange={this.InputChange.bind(this)}
                     > 
                    Gender
                     <input type='radio' value='Male' name='user' /> Male
                  <input type='radio' value='Female' name='user' /> Female
                </div>
                    <br></br>


{/* <InputLabel>country</InputLabel>   */}
 <OutlinedInput
                        //  name="Username"
                        placeholder="Enter your age"
                        style={{ width: '60%' }}
                        value={this.state.Details.age}
                        onChange={this.InputChange.bind(this, "age")}
                    //errorText="This field is required!"

                    />
                    <br></br>
                    <br></br>
                    <OutlinedInput
                        //  name="Username"
                        placeholder="Choos a username"
                        style={{ width: '60%' }}
                        value={this.state.Details.username}
                        onChange={this.InputChange.bind(this, "username")}
                    //errorText="This field is required!"

                    />
                    <br></br>
                    <br></br>
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
                    <Button variant="contained" color="#E3F2FD" onClick={(event) => this.handleClick(event)}><b>Register</b></Button>
       </Paper>
            </div>
        </form>
    </div>

)

}

    
    
        
    
}

export default Signup;