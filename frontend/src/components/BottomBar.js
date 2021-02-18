import React, { Component } from 'react';
import NoteList from './NoteList';

class BottomBar extends Component {
  render() {
    return (
      <div className='bottom-div'>
        <div>
        <select className="drop-down" onChange={this.props.handleSort}>
          <option value="default">Sort Notes</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        </div>
        <div className='bottombar'>
        <NoteList 
        handleDelete={this.props.handleDelete} 
        notes={this.props.notes} 
        selectedNote={this.props.selectedNote} 
        handleClick={this.props.handleClick} 
        handleCancel={this.props.handleCancel}
        filterNotes={this.props.filterNotes}/>
        </div>
      </div>
    );
  }
}

export default BottomBar;