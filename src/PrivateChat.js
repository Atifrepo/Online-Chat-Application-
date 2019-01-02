import React, { Component } from 'react'
import *as firebase from 'firebase'

class PrivateChat extends Component{
    constructor(){
        super();

    }
    
componentDidMount(){
    var ref=firebase.database().ref('private/')

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