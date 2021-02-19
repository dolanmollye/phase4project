import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import BottomBar from './BottomBar';

class Content extends Component {

  renderContent = () => {
    if (this.props.editNotes) {
      return <NoteEditor 
                handleCancel={this.props.handleCancel} 
                note={this.props.selectedNote} 
                handleChange={this.props.handleChange} 
                notes={this.props.notes} 
                handleSubmit={this.props.handleSubmit} 
                handleNote={this.props.handleNote}
                />;
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
        <br></br>
        <BottomBar 
          handleSort={this.props.handleSort}
          notes={this.props.notes}
          handleNew={this.props.handleNew} 
          handleCancel={this.props.handleCancel}
          handleClick={this.props.handleClick}
        />
      </div>
      
      
    );
  }
}

export default Content;
