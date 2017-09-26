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
      // console.log(data);
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

  moveBook = (book, from, to) => {
    console.log(`move book ${book} from: ${from}, to: ${to}`)
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
                <BookShelf title="Currently Reading" shelfId="currentlyReading" books={this.state.currentlyReadingBooks} onMoveBook={this.moveBook}/>
                <BookShelf title="Want to Read" shelfId="wantToRead" books={this.state.wantToReadBooks} onMoveBook={this.moveBook}/>
                <BookShelf title="Read" shelfId="read" books={this.state.readBooks} onMoveBook={this.moveBook}/>
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
