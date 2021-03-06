import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {
  return (
    <ul onClick={() => props.handleCancel()}>
      {props.filterNotes.map(note => <NoteItem key={note.id} note={note} handleClick={props.handleClick} filterNotes={props.filterNotes}/>)}
    </ul>
  );
}

export default NoteList;
