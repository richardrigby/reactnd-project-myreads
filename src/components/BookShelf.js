import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
  render() {
    const books = this.props.books;
    const bookList = books.map((book) =>
      <li key={book.id}>
        <Book
          backgroundImage={`url('${book.imageLinks.thumbnail}')`}
          width={128}
          height={193}
          bookTitle={book.title}
          bookAuthors={book.authors.join(', ')}
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
};

export default BookShelf;