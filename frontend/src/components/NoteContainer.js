import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

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

//   handleNotesFilter = (e) => {
//     let allNotes = this.state.notes
//     let searchNotes = e.target.value
//     let filterNotes = []
//     allNotes.filter(note => note.title.toLowerCase().includes(searchNotes.toLowerCase()) ? filterNotes.push(note) : null)
//     this.setState({
//         filterNotes: filterNotes
//     });
// }

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

//if 'title' radio button === true ? notesByTitle : null
//if 'content' radio button === true ? notesByContent : null
///if 'date' radio button === true ? notesbyDate : null

  render() {
    return (
      <Fragment>
        <Search 
          search={this.state.search}
          notes={this.state.notes}
          handleFilter={this.handleNotesFilter}
          selectedButton={this.state.selectedButton}
          handleOptionChange={this.handleOptionChange}
        />

        <div className='container'>
          <Sidebar
          filterNotes={this.state.filterNotes}
          handleNew={this.handleNew} 
          handleCancel={this.handleCancel} 
          notes={this.state.filterNotes}
          handleClick={this.handleClick}
          />

          <Content 
          handleDelete={this.handleDelete}
          handleCancel={this.handleCancel} 
          handleEdit={this.handleEdit} 
          selectedNote={this.state.selectedNote}
          editNotes={this.state.editNotes} 
          handleChange={this.makeEdits} 
          handleSubmit={this.handleSubmit}
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
