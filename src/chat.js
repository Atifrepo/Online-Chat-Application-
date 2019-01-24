import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
// import Twemoji from 'react-twemoji';
import ReactEmojiSelector from 'react-emoji-selector'
import Button from '@material-ui/core/Button';
import 'react-emoji-selector/lib/react-emoji-selector.css'
import EmojiReact from 'react-emoji-react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import MyEmojiInput from './newemoji'
import "./chatRoom.css"
import RaisedButton from 'material-ui/RaisedButton'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import GridListTile from '@material-ui/core/GridListTile';
import './chat.css'
import JSEMOJI from 'emoji-js';
import { TextField, SnackbarContent } from '@material-ui/core';
import *as firebase from 'firebase'
import EmojiPicker from 'emoji-picker-react';
import Emoji from './Emoji'
//emoji set up
let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = 'emojione';
// set the storage location for all emojis
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';

const emojis = [
    {
        name: 'rage',
        count: 2
    },
    {
        name: 'blush',
        count: 1
    },
    {
        name: 100,
        count: 3
    },
    {
        name: 'grinning',
        count: 2
    }
];
const styles = ({
    Paper: { marginTop: 10, height: 500, backgroundColor: 'inherit', position: 'relative', overflowY: 'auto' },

})
const action = (
    <Button color="secondary" size="small">
        {}
    </Button>
);


class Chat extends Component {
    constructor(props, context) {
        super(props, context);
        this.updateMessage = this.updateMessage.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
        // this.toogleEmojiState = this.toogleEmojiState.bind(this)
        // this.handleEmojiClick = this.handleEmojiClick.bind(this)
        this.state = {
            message: '',
            messages: [],
            emojiShown: false,
            PublicChat: [],
            emojis
        }
    }


    componentDidMount() {
        console.log("in did mount")

        //    var userId=firebase.auth().currentUser.uid
        firebase.database().ref('PublicChat/').on('value', snap => {
            var userobj = snap.val();
            var key = Object.keys(userobj);
            for (var i = 0; i < key.length; i++) {
                var k = key[i];
                this.state.PublicChat.push({
                    ...this.state.PublicChat,
                    id: userobj[k].id,
                    text: userobj[k].text,
                    SentBy: userobj[k].SentBy
                })
            }
            this.setState({
                messages: this.state.PublicChat
            })
            console.log('all', this.state.PublicChat)

            // firebase.database().ref('/PublicChat').on('value', (snapshot) => {
            //     if (snapshot.val()) {
            //         var userobj = snapshot.val();
            //         var key = Object.keys(userobj)
            //         for (var i = 0; i < key.length; i++)
            //             var k = key[i];


            //         const currentMessages = snapshot.val()
            //         console.log("Current", currentMessages)
            //         var mess = [];
            //         mess.push(currentMessages)
            //         this.setState({
            //             messages: mess
            //         })
            //     } else {
            //         console.log("No data")

            //     }

        })

    }
    selectEmoji(emoji) {
        this.setState({
            emoji: this.state.emojis,

            text: this.state.message + emoji
        }) // {emoji: "🚀", key: "rocket"}
        console.log('eoji', emoji)
    }
    updateMessage(event) {
        console.log('in update message' + event.target.value)
        this.setState({
            message: event.target.value
        })
    }
    submitMessage() {
        var userId = firebase.auth().currentUser.uid
        console.log('message submitted', this.state.messages)
        const nextMessage = {
            id: this.state.messages.length,
            text: this.state.message + emojis,
            SentBy: userId
        }
        firebase.database().ref('PublicChat/' + nextMessage.id).update(nextMessage)
    }
    onReaction(name) {
        const emojis = this.state.emojis.map(emoji => {
            if (emoji.name === name) {
                emoji.count += 1;
            }
            return emoji;
        });
        this.setState({
            emojis,

        });
        console.log('emojis', emojis)
    }

    onEmojiClick(name) {
        console.log(name);
        const emojis = this.state.emojis.concat([{ name, count: 1 }]);
        this.setState({
            emojis,
            text: this.state.messages + emojis
        });
        console.log('emojis what', emojis)
    }

    handleEmojiClick = (n, e) => {
        console.log('in handle emoji', e.name)

        let emoji = jsemoji.replace_colons(`:${e.name}:`);
        console.log('in emoji', this.state.message + emoji)
        this.setState({
            text: this.state.message + emoji
        });
    }
    // toogleEmojiState = () => {
    //     console.log('in toogle')
    //     this.setState({
    //         emojiShown: !this.state.emojiShown
    //     });
    // }


    render() {

        return (


            <Grid item xs={6} style={{ width: ' 50%', backgroundColor: '#fff', }} >
                <Paper >
                    <GridListTile key="h2" cols={2} style={{ height: 'auto', backgroundColor: '#526dca' }}>
                        <Typography variant="h5" color="inherit">دردشة عامة</Typography>
                    </GridListTile>
                    <Paper style={styles.Paper} >
                        <List >
                            {/* <ListItem variant="contained"> */}

                            {this.state.messages.map((message, i) => (


                                <SnackbarContent style={{ background: '#526DCA' }} message={message.text} action={action}>
                                    {/* <li key={message.id}>{message.text}</li> */}
                                </SnackbarContent>

                            ))}


                            {/* </ListItem> */}
                        </List>
                    </Paper>
                    <div id="message-sender" style={{ marginTop: 8, position: 'auto', width: '70%', }}>
                        <TextField style={{ width: '50%', marginLeft: 0, height: '20%' }}
                            // id="outlined-full-width"
                            style={{ margin: 8 }}
                            placeholder="Type message.."
                            fullWidth
                            variant="outlined"
                            onChange={this.updateMessage} type="text"
                        />
                        {/* <Emoji/> */}

                        <RaisedButton style={{ marginRight: '8rem' }} label="Send" primary={true} onClick={this.submitMessage}>
                        </RaisedButton>
                        <span id="show-emoji-yes" onClick={this.toogleEmojiState}></span>
                        <div className="emoji-table">


                        </div>
                    </div>
                </Paper>
            </Grid>

        )
    }

}
export default Chat;