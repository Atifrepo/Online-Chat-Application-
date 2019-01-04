import React, { Component } from 'react'
import *as firebase from 'firebase'

class PrivateChat extends Component{
    constructor(){
        super();
this.state={
    Members:[],
    Messages:[{
    Message:'',
    MessageId:'',
    uid:''
}
        
    ]
}
    }
    
componentDidMount(){
    console.log('in private chat')
const rootRef=firebase.database().ref().child('Group');
const speedRef=rootRef.child('Members')
speedRef.on('value',snap => {
    
} )
}
render(){
    return(
        <div>
            private chat
        </div>
    )
}
}
export default PrivateChat;                                         