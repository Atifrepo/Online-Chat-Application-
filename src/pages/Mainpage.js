import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import { TextField, SnackbarContent } from '@material-ui/core';
import List from 'material-ui/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GridListTile from '@material-ui/core/GridListTile';
import ButtonAppBar from './Header'
import '../mainpage.css'
import { Input } from '@material-ui/core';
import Chat from '../chat'
import *as firebase from 'firebase'
import GroupChat from '../GroupChat'
import Login from './login'

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
                   }
    }
    componentDidMount() {
        console.log('in component did mount')
        // var atif=firebase.auth().currentUser.uid
        // console.log('atif',atif)
        // firebase.database().ref('/Group/001/members').orderByChild('id').equalTo('umer').once('value', snapshot => {

        //     console.log("snapshot", snapshot.val());
        // })

        firebase.database().ref('User/').on('value', snap => {
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

    }
    updateMessage(event) {
        console.log('in update message' + event.target.value)
        this.setState({
            message: event.target.value
        })
    }
    submitMessage(index) {

        console.log(index)
        // var SelectedUser = ''
        // SelectedUser = this.state.all_users[index].uid;
        var atif = firebase.auth().currentUser.uid
        console.log('atif submit' + atif)
        //  console.log('selectsumbit'+SelectedUser)
        var keys = atif + ',' + atif;
        //console.log('message submitted', this.state.messages)
        console.log('sumbit key' + keys)
        const nextMessage={
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
            GroupId: atif + '/' + SelectedUser,
            GroupName: 'Friends',

        }).then(succ => {
            firebase.database().ref(`AllGroups/`).push({
                GroupId: atif + '/' + SelectedUser,
                GroupName: 'Friends',

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
        firebase.database().ref(`Group/${keys}/Members/`).orderByChild('id').equalTo(atif).once('value', snapshot => {

            console.log("snapshot", snapshot.val());
            var userobj = snapshot.val();
            var key = Object.keys(userobj)
            // let all_users = []
            for (var i = 0; i < key.length; i++) {
                var k = key[i];
                this.state.all_Group.push({

                    GroupName: userobj[k].GroupName,

                })
            }

            this.setState({

                Group: this.state.all_Group

            })
            console.log(this.state.all_Group)


        }
        )

        
   
    }

    render() {
        return (
            <div style={{ backgroundColor: '#E0E0E0' }}>

                {/* <Header /> */}
                <ButtonAppBar />
                {/* <PrivateChat/> */}
                <h1>مرحبا يا مستخدم</h1>

                <Paper style={{ backgroundColor: '#e0e0e0' }}>
                    <Grid container spacing={40}>
                        <Grid item xs={3} style={{ width: '30%', backgroundColor: '#212121', }}>
                            {/* overflowY: 'scroll' */}
                            <GridListTile key="h2" cols={2} style={{ height: 'auto', backgroundColor: '#424242' }}>
                                <Typography variant="h5" color="inherit">مستخدم على الانترنت</Typography>
                            </GridListTile>
                            <Paper style={styles.Paper}>

                                <GridListTile>

                                    <List component="ul">


                                        {this.state.users.map((item, index) => (


                                            <ListItem button variant="contained" style={{ backgroundColor: '#424242', }} onClick={this.PrivateChat.bind(this, index)}>
                                                {/* <ListItemText style={styles.listItem } primary= */}
                                                {item.username}

                                                {/* /> */}

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
                        <Paper style={styles.Paper} >
                        <List >
                            {/* <ListItem variant="contained"> */}

                                {this.state.messages.map((message, i) => (
                                    
                                
                                        <SnackbarContent style={{ background: '#526DCA' }} message={message.text}>
                                            <li key={message.id}>{message.text}</li>
                                        </SnackbarContent>
                                
                                ))}


                            {/* </ListItem> */}
                        </List>
                    </Paper>
                        {/* <Chat /> */}
                        
                        {/* <GroupChat /> */}
                    <Paper>
                        <Grid item xs={3} style={{ width: '50%', backgroundColor: '#FFFFFF' }}>
                        
                        <TextField style={{ width: '40%', marginLeft: 0, height: '20%' }}
                            // id="outlined-full-width"
                            style={{ margin: 8 }}
                            placeholder="Type message.."
                            fullWidth
                            variant="outlined"
                            onChange={this.updateMessage} type="text"
                        />

                        <RaisedButton style={{ marginRight: '8rem' }} label="Send" primary={true} onClick={this.submitMessage}>
                        </RaisedButton>
                        </Grid>
                        </Paper>
                <Grid item xs={3} style={{ width: '20%', backgroundColor: '#212121' }}>
                <GridListTile key="h2" cols={2} style={{ height: 'auto', backgroundColor: '#424242' }}>
                    <Typography variant="h5" color="inherit">مجموعة محادثة</Typography>
                </GridListTile>
                <Paper style={styles.Paper}>

                    <GridListTile>

                        <List component="ul">
                            {this.state.Group.map((item, index) => (
                                //  <SnackbarContent style={{ background: '#212121' }} message={item.username} /> 

                                <ListItem button variant="contained" style={{ backgroundColor: '#424242', }} >

                                    <ListItemText style={styles.listItem} primary=
                                        {item.GroupName}

                                    />

                                </ListItem>
                            ))}

                        </List>

                    </GridListTile>
                </Paper>
            </Grid>
            </Grid>
                    
                </Paper>
            </div>
        )
    }
}   