import React from 'react';

const truncate = (str) => {
  return str.length > 10 ? str.substring(1,10) + "..." : str
}

const NoteItem = (props) => (
  <li onClick={() => props.handleClick(props.note)}>
    <h2>{props.note.title}</h2>
    <p>{truncate(props.note.body)}</p>
  </li>
);

export default NoteItem;
