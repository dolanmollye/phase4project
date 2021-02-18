import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';

class Content extends Component {

  renderContent = () => {
    if (this.props.editNotes) {
      return <NoteEditor handleCancel={this.props.handleCancel} note={this.props.selectedNote} handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit}/>;
    } else if (this.props.selectedNote.body) {
      return <div className="view-div">
        <NoteViewer 
        key={this.props.selectedNote} 
        note={this.props.selectedNote} 
        handleDelete={this.props.handleDelete} 
        handleEdit={this.props.handleEdit}/>
        </div>
    }
  }

  render() {
    return (
      <div className='master-detail-element detail'>
        {this.renderContent()}
      </div>
    );
  }
}

export default Content;
