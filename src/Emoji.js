import React, { Component } from 'react';
import EmojiPicker from 'emoji-picker-react';
import JSEMOJI from 'emoji-js';
// import './emoji.css'
//emoji set up
let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = 'emojione';
// set the storage location for all emojis
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';

export default class Emoji extends Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toogleEmojiState = this.toogleEmojiState.bind(this)
        this.handleEmojiClick = this.handleEmojiClick.bind(this)
        this.state = {
            items: [],
            text: '',
        }
    }

    handleChange = (event) => {
        this.setState({ text: event.target.value });
    console.log('text emoji',this.state.text)
    }
    

    handleSubmit = (event) => {
        event.preventDefault();
        let newItem = {
            text: this.state.text,
            //   id: Date.now()
        };
        this.setState({
            items: [...this.state.items, newItem],
            text: ''
        });
        console.log(this.state.text)
    }
    //displays emoji inside the input window
    handleEmojiClick = (n, e) => {
        let emoji = jsemoji.replace_colons(`:${e.name}:`);
        console.log('emoji', emoji)
        this.setState({
            text: this.state.text + emoji
        });
        console.log(this.state.text)
    }
    toogleEmojiState = () => {
        this.setState({
            emojiShown: !this.state.emojiShown
        });
    }
    render() {
        const { items, text } = this.state;

        return (

            <div className="form">
                <form onSubmit={this.handleSubmit}>

                    <input className="input" onChange={this.handleChange} value={text} placeholder="Type your text..."

                    />
                    <button className="submit">{'Send'}</button>
                </form>
                <span id="show-emoji-yes" onClick={this.toogleEmojiState}>{'😎'}</span>
                <div className="emoji-table">
                    <EmojiPicker onEmojiClick={this.handleEmojiClick} />
                </div>
            </div>

        )
    }



}

