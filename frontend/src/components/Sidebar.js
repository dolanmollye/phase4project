import React, { Component } from 'react';
import NoteList from './NoteList';
import Instructions from './Instructions';

class Sidebar extends Component {
  render() {
    return (
      <div className='master-detail-element sidebar'>
        <Instructions />
        <select className="drop-down" onChange={this.props.handleSort}>
          <option value="default">Sort Notes</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <button onClick={(e)=> this.props.handleNew(e)}>New Note</button>
        <NoteList 
        handleDelete={this.props.handleDelete} 
        notes={this.props.notes} 
        filterNotes={this.props.filterNotes} 
        selectedNote={this.props.selectedNote} 
        handleClick={this.props.handleClick} 
        handleCancel={this.props.handleCancel}/>
        
      </div>
    );
  }
}

export default Sidebar;
