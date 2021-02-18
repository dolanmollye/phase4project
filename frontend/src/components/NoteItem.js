import React from 'react';
import {Link} from 'react-router-dom'

const truncate = (str) => {
  return str.length > 10 ? str.substring(0,15) + "..." : str
}

const NoteItem = (props) => (
  <Link to='/note-content' style={{ textDecoration: 'none', color: 'black'}}>
  <li onClick={() => props.handleClick(props.note) }>
    <h2>{props.note.title}</h2>
    <p>{truncate(props.note.body)}</p>
  </li>
  </Link>
);

export default NoteItem;
