import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchBooksBar from './components/SearchBooksBar'
import OpenSearchButton from './components/OpenSearchButton'
import BookShelf from './components/BookShelf'
import { Route } from 'react-router-dom'
import './App.css'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class BooksApp extends React.Component {
  state = {
    books: {
      wantToRead: [],
      currentlyReading: [],
      read: []
    }
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(data => {
      let wantToRead = data.filter(book => {
        return book.shelf === "wantToRead"
      });
      let currentlyReading = data.filter(book => {
        return book.shelf === "currentlyReading"
      });
      let read = data.filter(book => {
        return book.shelf === "read"
      });

      let books = { wantToRead, currentlyReading, read };

      this.setState({ books });
    }); 
  };

  moveBook = (bookID, bookTitle, toID, toName) => {
    let book = { id: bookID };
    BooksAPI.update(book, toID).then(data => {
      this.getAllBooks()
    }).then(() => {
      NotificationManager.success(`${bookTitle} moved to ${toName}`, 'Success!');
    });;
  };

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooksBar onMoveBook={this.moveBook} />
        )}/>

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title="Currently Reading" shelfID="currentlyReading" books={this.state.books.currentlyReading} onMoveBook={this.moveBook}/>
                <BookShelf title="Want to Read" shelfID="wantToRead" books={this.state.books.wantToRead} onMoveBook={this.moveBook}/>
                <BookShelf title="Read" shelfID="read" books={this.state.books.read} onMoveBook={this.moveBook}/>
              </div>
            </div>
            <OpenSearchButton />
          </div>
        )}/>
        <NotificationContainer/>
      </div>
    )
  }
}

export default BooksApp
