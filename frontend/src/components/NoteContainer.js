import React, { Component, Fragment } from 'react';
import {Route} from 'react-router-dom'
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';
import Header from './Header';


class NoteContainer extends Component {

  state = {
    notes: [],
    filterNotes: [],
    selectedNote: {},
    editNotes: false,
    selectedButton: 'title',
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/notes')
    .then(res => res.json())
    .then(note => this.setState({
      notes: note,
      filterNotes: note
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
         filterNotes: prevState.filterNotes.map(n => n.id === note.id ? note : n),
         editNotes: false
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
        title: "New Note",
        body: "Click to Edit",
        user_id: 1
      })
    })
    .then(res => res.json())
    .then(note => {
      this.setState(prevState => {
        return{
          filterNotes: [...prevState.filterNotes, note]
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
      filterNotes: newArr,
      selectedNote: {}
    }))
  }

handleNotesFilter = (e) => {
  let allNotes = this.state.notes
  let searchNotes = e.target.value
  let filterNotes = []
  if (this.state.selectedButton === 'title') {
    allNotes.filter(note => note.title.toLowerCase().includes(searchNotes.toLowerCase()) ? filterNotes.push(note) : null)
  }
  else if(this.state.selectedButton === 'content') {
    allNotes.filter(note => note.body.toLowerCase().includes(searchNotes.toLowerCase()) ? filterNotes.push(note) : null)
  }
  this.setState({
      filterNotes: filterNotes
  });
}

handleOptionChange = (e) => {
  this.setState({
    selectedButton: e.target.value
  })
}

handleSort = (e) => {
  console.log(this.state.notes)
  switch(e.target.value){
    case 'A-Z':
      let sortedNotes = this.state.filterNotes.sort((a,b) => (a.title > b.title) ? 1 : -1)
      this.setState({filterNotes: sortedNotes})
      break
    case 'Z-A':
      let reverseSort = this.state.filterNotes.sort((a,b) => (a.title > b.title) ? -1 : 1)
      this.setState({filterNotes: reverseSort})
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
          search={this.state.search}
          notes={this.state.notes}
          handleFilter={this.handleNotesFilter}
          selectedButton={this.state.selectedButton}
          handleOptionChange={this.handleOptionChange}
        />}}
        />

        <div className='container'>

        <Route exact path="/notes" render={() => {
          return  <Sidebar
          notes={this.state.filterNotes}
          handleSort={this.handleSort}
          filterNotes={this.state.filterNotes}
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
          selectedNote={this.state.selectedNote}
          editNotes={this.state.editNotes} 
          handleChange={this.makeEdits} 
          handleSubmit={this.handleSubmit}
          />
        }} />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
