import React, { Component } from 'react';
import { Input, TextField } from '@material-ui/core';
import *as firebase from 'firebase';

class Without extends Component {
    constructor(props, context) {
        super(props, context);
        this.updateMessage = this.updateMessage.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
        this.state = {
            message: '',
            messages: []


        }
    }
    componentDidMount() {
        console.log('in component did mount')
        firebase.database().ref('messages/').on('value', (snapshot) => {
            const currentMessages = snapshot.val()
            if (currentMessages != null) {
                this.setState({
                    messages:currentMessages
                })
            }
            //   this.setState({messages:this.state.messages})
        });
}
    updateMessage(event) {
        console.log('in update message'   +event.target.value)
        this.setState({
            message: event.target.value
        })
    }
    submitMessage(event) {
        console.log('message submitted' + this.state.message)
        const nextMessage = {
            id: this.state.messages.length,
            text: this.state.message
        }
        //firebase.database().ref('messages/'+nextMessage.id).set(nextMessage)
        var list= Object.assign([], this.state.messages) 
        list.push(nextMessage)
        this.setState({
            messages: list   
        })


        // //firebase.database().ref('messages/').push(nextMessage)
    }

    render(){
const currentMessage=this.state.messages.map((message,i) => {
    return(
        <li key={message.id}>{message.text}</li>
    )
})
return(
<div>
    <ol>
        {currentMessage}
        </ol>
        <input onChange={this.updateMessage} type="text" placeholder="message" />
        <br/>
        <button onClick={this.submitMessage}>submitMessage</button>

</div>

)
    }
}
export default Without