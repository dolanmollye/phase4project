import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';

/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and renderContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/
class Content extends Component {

  renderContent = () => {
    if (this.props.editNotes) {
      return <NoteEditor handleCancel={this.props.handleCancel} note={this.props.selectedNote} handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit}/>;
    } else if (this.props.selectedNote.body) {
      return <NoteViewer key={this.props.selectedNote} note={this.props.selectedNote} handleDelete={this.props.handleDelete} handleEdit={this.props.handleEdit}/>;
    } else {
      return <Instructions />;
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
