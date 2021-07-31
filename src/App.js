import React, { useEffect, useState } from 'react';
import { FormControl, Grid, IconButton, Input, InputLabel } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import db from './Firebase';
import Message from './Message/Message';

import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const name = () => {
    let enterName = '';
    while (!enterName || enterName.length > 16) {
      enterName = prompt('Please enter your name');
    }
    return enterName;
  }

  const updateInput = (e) => {
    setInput(e.target.value)
  }

  useEffect(() => {
    setUsername(name)
  }, [])

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      })
  }, [])

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput('');
  }

  return (
    <div className="App">
       <header className="headerr">
       <Grid container >
        <Grid item lg={6}>
          <div style={{display:"flex"}}>
          <img  src="https://img.icons8.com/cotton/64/000000/facebook-messenger--v4.png" height="47vw" width="47vw" />
        <h2>Messenger<h5>Group Chats</h5></h2>
          </div>
        
        </Grid>
        <Grid item lg={6}  >
          <div style={{display:"flex",position:"fixed" , right:"10px"}} >
          <img src="https://img.icons8.com/office/40/000000/user.png" height="40vw/40vh" width="40vw/40vh"/>
        <h3 >Welcome {username}</h3>
          </div>
        
        
        </Grid>
      </Grid>
      </header>
  

      <form className="app__form" onSubmit={sendMessage}>

        <FormControl className="app__formControl">
          <InputLabel value={input} onChange={updateInput}>Type a message...</InputLabel>
          <Input className="app__input" color="primary" value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton className="app__button" disabled={!input} color="primary" variant="contained" type="submit" onClick={sendMessage}><SendIcon /></IconButton>
        </FormControl>

      </form>

      <div className="app__messageContainer">
        <FlipMove>
          {
            messages.map(({ id, message }) => (
              <Message key={id} username={username} message={message} />
            ))
          }
        </FlipMove>
      </div>
    </div>
  );
}

export default App;
