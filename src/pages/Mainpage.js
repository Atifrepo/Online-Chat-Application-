import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GridListTile from '@material-ui/core/GridListTile';
import ButtonAppBar from './Header'
import '../mainpage.css'
import { Input } from '@material-ui/core';
import Chat from '../chat'
import *as firebase from 'firebase'

const styles = ({
    Paper: { padding: 20, marginTop: 10, marginBottom: 10, height: 400, backgroundColor: 'inherit', },
})
export default class MainPage extends Component {
    constructor() {
        super()
        this.state = {
            users:
                []

        }
    }
    componentDidMount() {
        console.log('in component did mount')
       firebase.database().ref('User/').on('value', snap => {
            var userobj = snap.val();
            var key = Object.keys(userobj);
            let all_users = []
            for (var i = 0; i < key.length; i++) {
                var k = key[i];
                all_users.push({

                    username: userobj[k].username,
                    Age: userobj[k].Age,
                    country: userobj[k].country,
                    //gender:userobj[k].gender,
                })
            }
            this.setState({
                users: all_users

            })
            console.log(all_users)

        }
        )



    }

    render() {
        return (
            <div style={{ backgroundColor: '#E0E0E0' }}>

                {/* <Header /> */}
                <ButtonAppBar />
                <h1>مرحبا يا مستخدم</h1>
                <Paper style={{ backgroundColor: '#e0e0e0' }} >
                    <Grid container spacing={40}>
                        <Grid item xs={3} style={{ width: '30%', backgroundColor: '#212121' }}>
                            {/* overflowY: 'scroll' */}
                            <GridListTile key="h2" cols={2} style={{ height: 'auto', backgroundColor: '#424242' }}>
                                <Typography variant="h5" color="inherit">مستخدم على الانترنت</Typography>
                            </GridListTile>
                            <Paper style={styles.Paper} >

                                <GridListTile>

                                    {/* <List component="ul"> */}
                                    {this.state.users.map((item, index) => (

                                        <ListItem button variant="contained" style={{ backgroundColor: '#424242', }}>

                                            <ListItemText style={{ color: '#FFFFFF', }} primary={item.username}

                                            />

                                        </ListItem>
                                    ))}

                                    {/* </List> */}

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