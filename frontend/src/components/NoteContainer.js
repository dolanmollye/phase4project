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

  handleEdit = () => {
    this.setState({
      editNotes: true
    })
  }

  handleCancel = () => {
    this.setState({
      editNotes: false
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

  handleNew = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/notes', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({ 
        title: "Title",
        body: "Body",
        user_id: 1
      })
    })
    .then(res => res.json())
    .then(note => {
      this.setState(prevState => {
        return{
          notes: [...prevState.notes, note]
        }
      })
    })
  }



  render() {
    return (
      <Fragment>
        <Search />
        <div className='container'>
          <Sidebar handleNew={this.handleNew} handleCancel={this.handleCancel} notes={this.state.notes} handleClick={this.handleClick}/>
          <Content handleCancel={this.handleCancel} handleEdit={this.handleEdit} selectedNote={this.state.selectedNote} editNotes={this.state.editNotes} handleChange={this.makeEdits} handleSubmit={this.handleSubmit}/>
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
