import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchBooksBar from './components/SearchBooksBar'
import OpenSearchButton from './components/OpenSearchButton'
import BookShelf from './components/BookShelf'
import { Route } from 'react-router-dom'
import './App.css'

// let books = [];

class BooksApp extends React.Component {
  state = {
    books: {
      wantToRead: [],
      currentlyReading: [],
      read: []
    }
    // wantToReadBooks: [],
    // currentlyReadingBooks: [],
    // readBooks: []
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(data => {
      // console.log(data);
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

  // setBooksAndState = (data) => {
  //   books = data;
  //   let wantToReadBooks = books.filter(book => {
  //     return book.shelf === "wantToRead"
  //   });
  //   let currentlyReadingBooks = books.filter(book => {
  //     return book.shelf === "currentlyReading"
  //   });
  //   let readBooks = books.filter(book => {
  //     return book.shelf === "read"
  //   });

  //   this.setState({ wantToReadBooks, currentlyReadingBooks, readBooks});
  // };

  moveBook = (bookID, from, to) => {
    // console.log(`move book ${bookID} from: ${from}, to: ${to}`);
    // let fromShelf = this.findShelf(from);
    // let toShelf = this.findShelf(to);

    // if (fromShelf === null) {
    //   console.log("Error finding from shelf")
    // }

    // if (toShelf === null) {
    //   console.log("Error finding to shelf")
    // }

    // console.log(fromShelf)
    // console.log(toShelf)

    let book = { id: bookID };
    BooksAPI.update(book, to).then(data => {
      // console.log(bookID);
      // console.log(data);

      // let wantToRead = data.wantToRead.map((responseBook) => { 
      //   return this.state.books.wantToRead.filter((stateBook) => {
      //     // console.log(`responseBook:${responseBook}, stateBook.id:${stateBook.id}`)
      //     return stateBook.id === responseBook;
      //   })[0];
      // });

      // let currentlyReading = data.currentlyReading.map((responseBook) => { 
      //   return this.state.books.currentlyReading.filter((stateBook) => {
      //     // console.log(`responseBook:${responseBook}, stateBook.id:${stateBook.id}`)
      //     return stateBook.id === responseBook;
      //   })[0];
      // });

      // let read = data.read.map((responseBook) => { 
      //   return this.state.books.read.filter((stateBook) => {
      //     // console.log(`responseBook:${responseBook}, stateBook.id:${stateBook.id}`)
      //     return stateBook.id === responseBook;
      //   })[0];
      // });

      // let books = { wantToRead, currentlyReading, read };
      // console.log(books)
      // this.setState({ books });
      this.getAllBooks();
    });
  };

  // findShelf = (shelfId) => {
  //   switch(shelfId) {
  //     case "wantToRead":
  //         return this.state.wantToReadBooks;
  //     case "currentlyReading":
  //         return this.state.currentlyReadingBooks;
  //     case "read":
  //         return this.state.readBooks;
  //     default:
  //       return null
  //   }
  // }

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
                <BookShelf title="Currently Reading" shelfID="currentlyReading" books={this.state.books.currentlyReading} onMoveBook={this.moveBook}/>
                <BookShelf title="Want to Read" shelfID="wantToRead" books={this.state.books.wantToRead} onMoveBook={this.moveBook}/>
                <BookShelf title="Read" shelfID="read" books={this.state.books.read} onMoveBook={this.moveBook}/>
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
