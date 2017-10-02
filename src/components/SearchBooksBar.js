import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'

class SearchBooksBar extends React.Component {
  state = {
    results: []
  };

  handleSearchInputChange = (event) => {
    let searchText = event.target.value;
    BooksAPI.search(searchText, 10).then(data => {
      this.setState({ results: data });
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.handleSearchInputChange}/>

          </div>
        </div>
        <div className="search-books-results">
          <BookShelf title="SearchResults" shelfID="searchResults" books={this.state.results} onMoveBook={this.props.onMoveBook}/>
        </div>
      </div>
    );
  }
};

export default SearchBooksBar;