import React from 'react';

const truncate = (str) => {
  return str.length > 10 ? str.substring(0,10) + "..." : str
}

const NoteItem = (props) => (
  <li onClick={() => props.handleClick(props.note) }>
    <h2>{props.note.title}</h2>
    <p>{truncate(props.note.body)}</p>
  </li>
);

export default NoteItem;
