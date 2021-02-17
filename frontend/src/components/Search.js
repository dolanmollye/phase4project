import React from 'react';

const Search = (props) => {
  return (
    <div className="filter">

      <div className="button-div">
        Filter By: 
        <input type="radio" id="title" value="title" checked={props.selectedButton === "title"} onChange={props.handleOptionChange}/>
        <label for="title">Title</label>
        <input type="radio" id="content" value="content" checked={props.selectedButton === "content"} onChange={props.handleOptionChange}/>
        <label for="title">Content</label>
      </div> 

      <br></br>

      <div className="search-bar">
      <input
        id="search-bar"
        type="text"
        placeholder="Search Notes"
        onChange={props.handleFilter}
      />
      </div>

    </div>
  );
}

export default Search;

//{props.notes.filter(note => note.title.includes(props.search)).map(searchedTitle => (searchedTitle.props.notes))}
