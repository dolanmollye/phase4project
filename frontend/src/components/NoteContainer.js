import React, { Component, Fragment } from 'react';
import {Route} from 'react-router-dom'
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';
import Header from './Header';


class NoteContainer extends Component {

  state = {
    notes: [],
    selectedNote: {},
    editNotes: false,
    selectedButton: 'title',
    filter: ""
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/notes')
    .then(res => res.json())
    .then(note => this.setState({
      notes: note
    }))
  }
  
  handleNote = (note) => this.setState(prevState => {
    const newNotes = [...prevState.notes].map(n => n.id === note.id ? note : n)
    return {notes: newNotes, selectedNote: note}
  })


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

  handleNew = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/notes', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({ 
        title: "New Note",
        body: "Click to Edit",
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

  handleDelete = (selectedNote) => {
    let newArr = this.state.notes.filter(note => note.id !== selectedNote.id)
    fetch(`http://localhost:3000/api/v1/notes/${selectedNote.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(this.setState({
      notes: newArr,
      selectedNote: {}
    }))
  }

handleNotesFilter = (e) => {
  this.setState({
    filter: e.target.value
  })
}

filterTitle = () => {
  let allNotes = [...this.state.notes]

  if (this.state.filter.length > 0) {
    return allNotes.filter(note => note.title.toLowerCase().includes(this.state.filter.toLowerCase()))
  }
  return (this.state.notes)
}

filterContent = () => {
  let allNotes = [...this.state.notes]
  if (this.state.filter.length > 0) {
    return allNotes.filter(note => note.body.toLowerCase().includes(this.state.filter.toLowerCase()))
  }
  return (this.state.notes)
}

buttonFun = () => {
  switch(this.state.selectedButton) {
    case "title": 
      return this.filterTitle()
    case "content":
      return this.filterContent()
    default:
      return this.state.notes
  }
}

handleOptionChange = (e) => {
  this.setState({
    selectedButton: e.target.value
  })
}

handleSort = (e) => {
  switch(e.target.value){
    case 'A-Z':
      let sortedNotes = this.state.notes.sort((a,b) => (a.title > b.title) ? 1 : -1)
      this.setState({notes: sortedNotes})
      break
    case 'Z-A':
      let reverseSort = this.state.notes.sort((a,b) => (a.title > b.title) ? -1 : 1)
      this.setState({notes: reverseSort})
      break
    default:
  }
}

  render() {
    return (
      <Fragment>
        <Header />
        <Route exact path='/notes' render={() => {
        return <Search 
          handleFilter={this.handleNotesFilter}
          selectedButton={this.state.selectedButton}
          handleOptionChange={this.handleOptionChange}
        />}}
        />

        <div className='container'>

        <Route exact path="/notes" render={() => {
          return  <Sidebar
          notes={this.buttonFun()}
          handleSort={this.handleSort}
          handleNew={this.handleNew} 
          handleCancel={this.handleCancel}
          handleClick={this.handleClick}
          />
        }} />

        <Route path='/note-content' render={() => {
          return <Content 
          handleDelete={this.handleDelete}
          handleCancel={this.handleCancel} 
          handleEdit={this.handleEdit} 
          handleChange={this.makeEdits} 
          handleNote={this.handleNote}
          handleSort={this.handleSort}
          handleClick={this.handleClick}
          selectedNote={this.state.selectedNote}
          editNotes={this.state.editNotes} 
          notes={this.state.notes}
          
          />
        }} />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
