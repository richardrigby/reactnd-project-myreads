import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
  render() {
    const books = this.props.books;

    if (books.error === "empty query") {
      return (
      <div>No match found</div>
    )
    } else {
      const bookList = books.map((book) =>
        <li key={book.id}>
          <Book
            bookID={book.id}
            shelfID={this.props.shelfID}
            backgroundImage={book.imageLinks === undefined ? "" : book.imageLinks.thumbnail === undefined ? "" : book.imageLinks.thumbnail }
            bookTitle={book.title === undefined ? "" : book.title}
            bookAuthors={book.authors === undefined ? "" : book.authors.join(', ')}
            onMoveBook={this.props.onMoveBook}
          />
        </li>
      );
      return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {bookList}
            </ol>
          </div>
        </div>
      );
    }
  }
};

export default BookShelf;