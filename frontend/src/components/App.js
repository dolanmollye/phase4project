import React, { Component } from 'react';
import NoteContainer from './NoteContainer';
import Login from './Login'
import {Route} from 'react-router-dom'

class App extends Component {

 
  render() {
    return (
      <div className="app">
        <NoteContainer />
        <Route exact path='/' component={Login}/>
      </div>
    );
  }
}

export default App;
