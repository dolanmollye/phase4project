import React from 'react';

const Search = (props) => {
  return (
    <div className="filter">
      <input
        id="search-bar"
        type="text"
        placeholder="Search Notes"
        onChange={props.handleFilter}
      />

    </div>
  );
}

export default Search;

//{props.notes.filter(note => note.title.includes(props.search)).map(searchedTitle => (searchedTitle.props.notes))}
