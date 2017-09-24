import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchBooksBar from './components/SearchBooksBar'
import OpenSearchButton from './components/OpenSearchButton'
import BookShelf from './components/BookShelf'
import { Route } from 'react-router-dom'
import './App.css'

let books = [];

class BooksApp extends React.Component {
  state = {
    wantToReadBooks: [],
    currentlyReadingBooks: [],
    readBooks: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      books = data;
      let wantToReadBooks = books.filter(book => {
        return book.shelf === "wantToRead"
      });
      let currentlyReadingBooks = books.filter(book => {
        return book.shelf === "currentlyReading"
      });
      let readBooks = books.filter(book => {
        return book.shelf === "read"
      });

      this.setState({ wantToReadBooks, currentlyReadingBooks, readBooks});
    }); 
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" component={SearchBooksBar}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title="Currently Reading" books={this.state.currentlyReadingBooks}/>
                <BookShelf title="Want to Read" books={this.state.wantToReadBooks}/>
                <BookShelf title="Read" books={this.state.readBooks}/>
              </div>
            </div>
            <OpenSearchButton />
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
