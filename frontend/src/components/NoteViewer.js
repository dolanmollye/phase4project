import React, { Fragment } from 'react';
import {Link} from 'react-router-dom'
const NoteViewer = (props) => {
  return (
    <Fragment>
      <h2>{props.note.title}</h2>
      <p>{props.note.body}</p>
      <button onClick={()=> props.handleEdit(props.note)}>Edit</button>
      <Link to='/notes'>
        <button onClick={() => props.handleDelete(props.note)}>
          Delete
          </button>
      </Link>
    </Fragment>
  )
}

export default NoteViewer;
