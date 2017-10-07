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
    if (searchText === "") {
      this.setState({ results: [] });
      return;
    }
    BooksAPI.search(searchText, 10).then(data => {
      if (data === undefined) {
        this.setState({ results: [] });
        return;
      }

      if (!Array.isArray(data)) {
        this.setState({ results: data });
        return;
      }

      // We need to add the shelf property to any books in the search results which are already 
      // on a shelf in our collection.
      let results = data.map((book) => {
        let matchedBooks = this.props.shelfBooks.filter(shelfBook => shelfBook.id === book.id);
        // Since we're filtering on 'id' there should only be one possible match if the book
        // is already in our collection.
        if (matchedBooks.length === 1) {
          // Add the shelf property to the book in the search results so that it will
          // show in the search results that the book is already on one of the shelfs.
          book["shelf"] = matchedBooks[0].shelf;
        }
        return book;
      });
      this.setState({ results });
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
          <BookShelf title="SearchResults" books={this.state.results} onMoveBook={this.props.onMoveBook}/>
        </div>
      </div>
    );
  }
};

export default SearchBooksBar;