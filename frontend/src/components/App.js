import React, { Component } from 'react';
import NoteContainer from './NoteContainer';
import Login from './Login'
import {Route} from 'react-router-dom'

class App extends Component {

 
  render() {
    return (
      <div className="app">
        <Route exact path='/' component={Login}/>
        <NoteContainer />
      </div>
    );
  }
}

export default App;
