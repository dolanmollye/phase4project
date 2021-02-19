import React, { Component } from 'react';

class NoteEditor extends Component {
  state = {
    title: '',
    body: ''
  }
  
  componentDidMount = () => {
    this.setState({
      title: this.props.note.title,
      body: this.props.note.body
    })
  }
  changeTitle = (e) => {
    this.setState({
       [e.target.name] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/notes/${this.props.note.id}`, {
      method: 'PATCH',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(note => {
       this.props.handleNote(note)
     })
    }

  render() {
    return (
      <form className="note-editor" onSubmit={(e) => this.handleSubmit(e)}>
        <input type="text" name="title" value={this.state.title} onChange={(e) => this.changeTitle(e)} />
        <textarea name="body" value={this.state.body} onChange={(e) => this.changeTitle(e)} />
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button" onClick={this.props.handleCancel}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;