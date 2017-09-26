import React from 'react'

class Book extends React.Component {
  state = {
    moveToShelf: ""
  }
  moveBook = (event) => {
    // console.log(`Move to ${event.target.value}`);
    // console.log(`Move from ${this.props.shelfId}`);
    this.props.onMoveBook(this.props.bookId, this.props.shelfId, event.target.value)
  };

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: this.props.width, height: this.props.height, backgroundImage: this.props.backgroundImage }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.moveBook} value={this.state.moveToShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.bookTitle}</div>
        <div className="book-authors">{this.props.bookAuthors}</div>
      </div>
    );
  }
};

export default Book;


