import React, { Component } from 'react';
import { ThemeProvider } from '@livechat/ui-kit';
 
const theme = {
    vars: {
        'primary-color': '#427fe1',
        'secondary-color': '#fbfbfb',
        'tertiary-color': '#fff',
        'avatar-border-color': 'blue',
    },
    AgentBar: {
        Avatar: {
            size: '42px',
        },
        css: {
            backgroundColor: 'var(--secondary-color)',
            borderColor: 'var(--avatar-border-color)',
        }
    },
    Message: {
        css: {
            fontWeight: 'bold',
        },
    },
}


export default class Theme extends Component{
      constructor(){
          super()
      }
render(){
    return(
        <ThemeProvider>
   <AgentBar>
  <Avatar imgUrl="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg" />
  <Column>
    <Title>{'Jon Snow'}</Title>
    <Subtitle>{'Support hero'}</Subtitle>
  </Column>
</AgentBar>
</ThemeProvider>
    )
}

    }