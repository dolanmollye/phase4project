import React, { Component } from 'react';

class NoteEditor extends Component {
  render() {
    return (
      <form className="note-editor" onSubmit={(e) => this.props.handleSubmit(this.props, e)}>
        <input type="text" name="title" value={this.props.note.title} onChange={this.props.handleChange} />
        <textarea name="body" value={this.props.note.body} onChange={this.props.handleChange} />
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;

//onChange and value