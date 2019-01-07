import React, {Component} from 'react'
import *as firebase from 'firebase'

class PrivateChat extends Component{
    constructor(){
        super();
        this.state={
            Members:''
        }
    }
// componentDidMount(){
//     console.log('in compo')
// var uid=firebase.auth().currentUser.uid
// console.log('userid'+uid)
// const rootRef=firebase.database().ref('User');
// var speedRef=rootRef.child('Private')
// }
componentDidMount(){
    console.log('yahan')
    var uid1=firebase.auth().currentUser.uid
    console.log('id1'+uid1)
    //var uid2=firebase.auth().otherUser.uid
    // console.log('id2'+uid2)
}
// GroupChat(){
// console.log('group')
// firebase.database().ref('User/')

// }

render(){
    return(
        <div>
            lol
        </div>
    )
}
}
export default PrivateChat