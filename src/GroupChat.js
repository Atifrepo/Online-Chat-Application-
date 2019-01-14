import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import List from 'material-ui/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GridListTile from '@material-ui/core/GridListTile';
import *as firebase from 'firebase'

const styles = ({
    Paper: { padding: 20, marginTop: 10, marginBottom: 10, height: 400, backgroundColor: 'inherit', overflowY: 'auto' },
    listItem: {
        textColor: '#ffffff',
        backgroundColor: '#505050'
    }



})

class GroupChat extends Component {
    constructor() {
        // this.atif=firebase.auth().currentUser.uid
        super();
        this.state = {
            Group: [],
            all_Group: [],
            Messages: [],
            Message: '',

        }
    }
    // componentDidMount() {                                                                                           
    //     console.log('in group chat')
    //     firebase.database().ref('Group/002/messages').on('value', snap => {
    //         var userobj = snap.val()
    //         var key = Object.keys(userobj)
    //         for (var i = 0; i < key.length; i++) {
    //             var k = key[i];
    //             this.state.all_Group.push({
    //                 AllMembers: userobj[k].messages
    //             })

    //         }
    //         this.setState({
    //             Group: this.state.all_Group
    //         })
    //         console.log('kr'+this.state.all_Group)
    //     })
    // }
   
    componentDidMount() {
        console.log('in group chat componnet')

        // var atif = firebase.auth().currentUser.uid
        // console.log('id my'+atif)
        // // firebase.database().ref(`Group/Members`).orderByChild('id').equalTo(atif).once('value', snapshot => {

            // console.log("snapshot", snapshot.val());
// firebase.database().ref('Group/').on('value',snapshot => {

// // })
//             var userobj = snapshot.val();
//             var key = Object.keys(userobj)
//             // let all_users = []
//             for (var i = 0; i < key.length; i++) {
//                 var k = key[i];
//                 this.state.all_Group.push({

//                     GroupName: userobj[k].GroupName,

//                 })
//             }

//             this.setState({

//                 Group: this.state.all_Group

//             })
//             console.log(this.state.all_Group)


//         }
//         )


    }

    UserInGroup() {
 }

    render() {
        return (
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
        )
    }
}
export default GroupChat