import React, { Component } from 'react'
import *as firebase from 'firebase'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../chatRoom.css';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

 const styles = theme => ({
    rightIcon: {
        marginLeft: theme.spacing.unit,
     },
    
  });

class ChatRoom extends Component {
    constructor() {
        super()
        this.updateMessage = this.updateMessage.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
        this.state = {
            users: 'eren',
            message: '',
            messages: [],
            rightIcon: '',
            
        }

    }

    componentDidMount() {
        console.log('in component did mount')
        firebase.database().ref('messages/').on('value', (snapshot) => {
            const currentMessages = snapshot.val()
            if (currentMessages != null) {
                this.setState({
                    messages: currentMessages
                })
            }
        })
        


    }

    updateMessage(event) {
        console.log('in update message' + event.target.value)
        this.setState({
            message: event.target.value
        })
    }

    submitMessage(event) {
        console.log('submit message:' + this.state.message)
        const nextMessage = {
            id: this.state.messages.length,
            text: this.state.message
        }
        firebase.database().ref('messages/').push(nextMessage)

    }

    OpenNewSnackbar(event) {
console.log('new chat with', this.state.users )
var newMessage=this.state.messages
newMessage=event.target.value

    }



    render() {
       
          
        //   const { classes } = props;
        // // //   function IconLabelButtons(props) {
        // // //     const { classes } = props;

     
        
        return (

            <MuiThemeProvider>

                <div>
                    <AppBar title="Chat Room" style={{backgroundColor:'#90A4AE'}}
                    />
                    <div className="chatpage">
                        <div align="right"
                            class="online-user"
                            style={{
                                backgroundColor: '#455A64',
                                margin: 12

                            }}>
                            <h3>Online user will be diplay here</h3>
                            <div align="left">
                            {
                              <Button style={{color:'#90A4AE'}} onClick={(event) => this.OpenNewSnackbar(event) }>{this.state.users}</Button>
                        
                            
                            } 
                
                </div>
                        </div>
                        <div align="center" className="message-conataniner"
                            style={{
                                border: 100,
                                margin: 100,
                                
                            }}>
                               {/* { this.state.messages.map((item, index) => (
                                <SnackbarContent style={{
                                backgroundColor:'#546E7A',
                                spacing:'1px'
                                
                            }} */}
                            {/* //{ message={item.messages}} */}
                            {/* /> */}
                           
                            <TextField
                                
                                hintText="Type message..."
                                onChange={this.updateMessage} type="text" />
                        
                            <Button 
                            
                            
                            variant="contained" className={this.state.rightIcon} onClick={this.submitMessage}>Send
                             <Icon className={this.state.rightIcon}>send</Icon>
                            </Button>
                            <br />
                            {/* <Button variant="contained" color="primary" className={classes.button}>
        Send */}
        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                             {/* <Icon className={classes.rightIcon}>send</Icon> 
                             </Button> */}
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
  

};

export default withStyles(styles)(ChatRoom); 