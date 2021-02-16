import React, { Component } from 'react';
import NoteList from './NoteList';

class Sidebar extends Component {
  render() {
    return (
      <div className='master-detail-element sidebar'>
        <NoteList handleDelete={this.props.handleDelete} notes={this.props.notes} selectedNote={this.props.selectedNote} handleClick={this.props.handleClick} handleCancel={this.props.handleCancel}/>
        <button onClick={(e)=> this.props.handleNew(e)}>Create a Note!</button>
      </div>
    );
  }
}

export default Sidebar;
