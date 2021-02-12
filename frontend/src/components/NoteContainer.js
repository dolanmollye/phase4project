import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {

  state = {
    notes: [],
    selectedNote: {},
    editNotes: false
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/notes')
    .then(res => res.json())
    .then(note => this.setState({
      notes: note
    }))
  }
  
  handleClick =(note) => this.setState({
    selectedNote: note
  })

  handleEdit = (note) => {
    this.setState({
      editNotes: true
    })
  }

  makeEdits = (e) => {
    e.persist();
     this.setState(prevState => ({
        selectedNote: {
          ...prevState.selectedNote,
          [e.target.name] : e.target.value
        }
      }))
  }

  handleSubmit = (note, e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/notes/${note.note.id}`, {
      method: 'PATCH',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(note.note)
    })
    .then(res => res.json())
    .then(note => {
     this.setState(prevState => {
       return {
         notes: prevState.notes.map(n => n.id === note.id ? note : n)
       }
     })
    })
  }



  render() {
    return (
      <Fragment>
        <Search />
        <div className='container'>
          <Sidebar notes={this.state.notes} handleClick={this.handleClick}/>
          <Content handleEdit={this.handleEdit} selectedNote={this.state.selectedNote} editNotes={this.state.editNotes} handleChange={this.makeEdits} handleSubmit={this.handleSubmit}/>
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
