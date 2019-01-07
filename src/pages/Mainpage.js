import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import List from 'material-ui/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GridListTile from '@material-ui/core/GridListTile';
import ButtonAppBar from './Header'
import '../mainpage.css'
import { Input } from '@material-ui/core';
import Chat from '../chat'
import *as firebase from 'firebase'
import PrivateChat from '../PrivateChat'
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
        this.state = {
            users:
                [],
            user: null,
            Group: [],
            UserDetails:[],
            Members: '',
            AllMessages: [{
                Message: '',
                Sender: ''
            }],
        all_users:[]
        }
    }
    componentDidMount() {
        console.log('in component did mount')
    //   var userId=firebase.auth().currentUser.uid
      
    firebase.database().ref('/Group/001/members').orderByChild('id').equalTo('umer').once('value', snapshot => {

            console.log("snapshot",snapshot.val());
        })

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
    }
    PrivateChat(index) {
        var userId=firebase.auth().currentUser.uid
            console.log('lsd'+userId)
        var SelectedUser=''
        SelectedUser=this.state.all_users[index].uid;
        this.setState({Partcicpents:true,SelectedUser});
      
    //members:[{id},{id}{id}{id}]
        var temp = {id:SelectedUser}
        firebase.database().ref('Group/002/members').push(  
        {
            // ...this.state.SelectedUser,
            MembersList:SelectedUser,
            // Messages:this.state.AllMessages,
            // lastSeen:"this.state.AllMessages",
            // seen:'seen'
                }
        )


        firebase.database().ref('Group/002/messages').push(  
            {
              
                message:"hi",
                sendBy:SelectedUser
                    }
            )
            
       firebase.database().ref('UserInGroup').push(
            {
                UserId:userId
            
            }
                )
                firebase.database().ref('/UserInGroup').orderByChild('id').equalTo('umer').once('value', snapshot => {

                    console.log("snapshot",snapshot.val());
                })
          
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
                                            // <SnackbarContent style={{ background: '#212121' }} message={item.username} />

                                            <ListItem button variant="contained" style={{ backgroundColor: '#424242', }} onClick={ this.PrivateChat.bind(this,index)}>

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
                        <Chat />
                    </Grid>
                </Paper>
            </div>
        )
    }
}   