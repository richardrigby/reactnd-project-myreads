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
    books: []
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    }); 
  };

  moveBook = (bookID, bookTitle, shelfID, shelf) => {
    let book = { id: bookID };
    BooksAPI.update(book, shelfID).then(data => {
      this.getAllBooks()
    }).then(() => {
      NotificationManager.success(`'${bookTitle}' moved to '${shelf}'`, 'Success!');
    });;
  };

  render() {
    const wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead')
    const currentlyReading = this.state.books.filter(book => book.shelf === 'currentlyReading')
    const read = this.state.books.filter(book => book.shelf === 'read')

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooksBar onMoveBook={this.moveBook} shelfBooks={this.state.books} />
        )}/>

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title="Currently Reading" shelfID="currentlyReading" books={currentlyReading} onMoveBook={this.moveBook}/>
                <BookShelf title="Want to Read" shelfID="wantToRead" books={wantToRead} onMoveBook={this.moveBook}/>
                <BookShelf title="Read" shelfID="read" books={read} onMoveBook={this.moveBook}/>
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
