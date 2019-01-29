import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import RaisedButton from 'material-ui/RaisedButton'
import { TextField, SnackbarContent, Paper, List, Grid } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import GridListTile from '@material-ui/core/GridListTile';
import ButtonAppBar from './Header'
import '../mainpage.css'
import { Input } from '@material-ui/core';
import Chat from '../chat'
import *as firebase from 'firebase'
import { ThemeProvider } from '@livechat/ui-kit'


const styles = ({
    Paper: { padding: 20, marginTop: 10, marginBottom: 10, height: 400, backgroundColor: 'inherit', overflowY: 'auto' },
    listItem: {
        textColor: '#ffffff',
        backgroundColor: '#505050'
    }
})
export default class MainPage extends Component {
    constructor() {
        super()
        this.updateMessage = this.updateMessage.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
        this.state = {
            users: [],
            message: '',
            messages: [],
            Group: [],
            GroupChat: [],
            all_Group: [],
            all_users: [],
            main_key: [],
            current_chat_id: '',

        }
    }
    componentDidMount() {
        console.log('in component did mount')
        // var atif=firebase.auth().currentUser.uid
        // console.log('atif',atif)
        // firebase.database().ref('/Group/001/members').orderByChild('id').equalTo('umer').once('value', snapshot => {

        //     console.log("snapshot", snapshot.val());
        // })

        firebase.database().ref('Users/').on('value', snap => {
            var userobj = snap.val();
            var key = Object.keys(userobj);
            // let all_users = []
            for (var i = 0; i < key.length; i++) {
                var k = key[i];
                this.state.all_users.push({

                    username: userobj[k].username,
                    Age: userobj[k].Age,
                    country: userobj[k].country,
                    //gender:userobj[k].gender,
                    uid: userobj[k].uid
                })
            }
            this.setState({

                users: this.state.all_users

            })
            console.log(this.state.all_users)
        }
        )

        // firebase.database().ref(`Group/${keys}/Members/`).orderByChild('id').equalTo(atif).once('value', snapshot => {

        //     console.log("snapshot", snapshot.val());
        // })
        firebase.database().ref('AllGroups/').on('value', snapshot => {

            // })
            var userobj = snapshot.val();
            if (snapshot.val()) {
                var key = Object.keys(userobj)
                // let all_users = []
                for (var i = 0; i < key.length; i++) {
                    var k = key[i];
                    this.state.all_Group.push({
                        group_id: userobj[k].GroupId,
                        GroupName: userobj[k].GroupName,

                    })
                }
                this.setState({

                    Group: this.state.all_Group

                })
                console.log(this.state.all_Group)

            }




        }
        )

    }
    updateMessage(event) {
        console.log('in update message' + event.target.value)
        this.setState({
            message: event.target.value
        })
    }
    submitMessage(index) {
        this.setState({ messages:[]});

        console.log(index)
        var atif = firebase.auth().currentUser.uid
        console.log('atif submit' + atif)
        var keys = this.state.current_chat_id;
        console.log('sumbit key' + keys)
        // this.state.messages.push(this.state.message);
        const nextMessage = {
            text: this.state.message,
            SentBy: atif
        }
        firebase.database().ref(`Group/${keys}/chat/`).push(nextMessage)
    }
    PrivateChat(index) {
        var atif = firebase.auth().currentUser.uid
        var SelectedUser = ''
        SelectedUser = this.state.all_users[index].uid;
        this.setState({ Partcicpents: true, SelectedUser });
        console.log('dk' + SelectedUser)
        console.log('current' + atif)
        console.log('selected' + SelectedUser)

        var keys = atif + ',' + SelectedUser;
        console.log("keys", keys)
        firebase.database().ref(`Group/${atif},${SelectedUser}/`).set({
            GroupId: atif + ',' + SelectedUser,
            GroupName: 'Friends',
            keys: keys
        }).then(succ => {
            firebase.database().ref(`AllGroups/`).push({
                GroupId: atif + ',' + SelectedUser,
                GroupName: this.state.all_users[index].username,
                Member1: atif,
                Member2: SelectedUser,

            })
        })



        firebase.database().ref(`Group/${keys}/Members/`).push({
            id: atif,
            Date: "100eejh"
        })
        firebase.database().ref(`Group/${keys}/Members/`).push({
            id: SelectedUser,
            Date: "110eejh"
        })
    }

    DisplayMessages(index) {
        console.log('in display ');
        this.setState({
            GroupChat: []

        })

        var atif = firebase.auth().currentUser.uid
        console.log('keys index umer ', this.state.Group[index]);
        var keys = this.state.Group[index].group_id;
        console.log('keys display' + keys);
        this.setState({ current_chat_id: keys ,messages:[]});

        firebase.database().ref(`Group/${keys}/chat/`).on('value', snap => {
            var userobj = snap.val();
            this.setState({
                messages: []
            },()=>{
                if (snap.val()) {
                    console.log("this.state.messages",this.state.messages)
                    var key = Object.keys(userobj);
                    for (var i = 0; i < key.length; i++) {
                        var k = key[i];
                        this.state.GroupChat.push({
                            // ...this.state.GroupChat,
    
                            text: userobj[k].text,
                            SentBy: userobj[k].SentBy
                        })
                    }
                    this.setState({
                        messages: this.state.GroupChat
                    })
                    console.log('all', this.state.GroupChat)
                }// if closing 
            })
     
        })

    }

    render() {
        return (
            <ThemeProvider>
                <div style={{ backgroundColor: '#E0E0E0' }}>


                    <ButtonAppBar />

                    <h1>مرحبا يا مستخدم</h1>

                    <Paper style={{ backgroundColor: '#e0e0e0' }}>
                        <Grid container spacing={40}>
                            <Grid item xs={3} style={{ width: '30%', backgroundColor: '#212121', }}>


                                <GridListTile key="h2" cols={2} style={{ height: 'auto', backgroundColor: '#424242' }}>
                                    <Typography variant="h5" color="inherit">مستخدم على الانترنت</Typography>
                                </GridListTile>
                                <Paper style={styles.Paper}>

                                    <GridListTile>
                                        <List component="ul">
                                            {this.state.users.map((item, index) => (
                                                <ListItem button variant="contained" style={{ backgroundColor: '#424242', }} onClick={this.PrivateChat.bind(this, index)}>
                                                    {item.username}
                                                </ListItem>
                                            ))}

                                        </List>

                                    </GridListTile>
                                </Paper>
                                <GridListTile key="h2" cols={2} style={{ height: 'auto', backgroundColor: '#424242' }}  >
                                    <div className='radioButton' >
                                        <input type='radio' value='All' /> All
                            <input type='radio' value='Male' name='user' /> Male
                          <input type='radio' value='Female' name='user' /> Female
                        </div>
                                </GridListTile>
                                <br></br>
                                <Input style={{ backgroundColor: "#e0e0e0", width: '100%', }}
                                    name="search"
                                    placeholder="search for user..."
                                    id="outlined-search"
                                    label="Search field"
                                    type="search"
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6} style={{ width: '50%', backgroundColor: '#FFFFFF' }}>
                                <Paper>
                                    <GridListTile key="h2" cols={2} style={{ height: 'auto', backgroundColor: '#526dca' }}>
                                        <Typography variant="h5" color="inherit">دردشة عامة</Typography>
                                    </GridListTile>
                                    <Paper style={styles.Paper} >
                                        <List >
                                            {this.state.messages.map((message, i) => (
                                                <SnackbarContent style={{ background: '#526DCA' }} message={message.text}>
                                                    <li key={message.id}>{message.text}</li>
                                                </SnackbarContent>
                                            ))}
                                        </List>
                                    </Paper>
                                    {/* <Chat /> */}
                                    <div id="message-sender" style={{ marginTop: 8, position: 'auto', width: '70%', }}>
                                        <TextField style={{ width: '40%', marginLeft: 0, height: '20%' }}
                                            style={{ margin: 8 }}
                                            placeholder="Type message.."
                                            fullWidth
                                            variant="outlined"
                                            onChange={this.updateMessage} type="text"
                                        />
                                        <RaisedButton style={{ marginRight: '8rem' }} label="Send" primary={true} onClick={this.submitMessage}>
                                        </RaisedButton>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={3} style={{ width: '20%', backgroundColor: '#212121' }}>
                                <GridListTile key="h2" cols={2} style={{ height: 'auto', backgroundColor: '#424242' }}>
                                    <Typography variant="h5" color="inherit">مجموعة محادثة</Typography>
                                </GridListTile>
                                <Paper style={styles.Paper}>
                                    <GridListTile>
                                        <List component="ul">
                                            {this.state.Group.map((item, index) => (
                                                <ListItem button variant="contained" style={{ backgroundColor: '#424242', }} onClick={this.DisplayMessages.bind(this, index)} >
                                                    {item.GroupName}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </GridListTile>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </ThemeProvider>
        )
    }
}   