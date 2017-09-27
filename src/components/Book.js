import React from 'react'

class Book extends React.Component {
  state = {
    shelf: ""
  }
  moveBook = (event) => {
    this.props.onMoveBook(this.props.bookID, event.target.value)
  };

  componentDidMount() {
    this.setState({ shelf: this.props.shelfID})
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: this.props.width, height: this.props.height, backgroundImage: this.props.backgroundImage }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.moveBook} value={this.state.shelf}>
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


