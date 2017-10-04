import React from 'react'

class Book extends React.Component {
  state = {
    shelf: ""
  }
  moveBook = (event) => {
    let shelfName = event.target.options[event.target.selectedIndex].text;
    this.props.onMoveBook(this.props.bookID, this.props.bookTitle, event.target.value, shelfName);
  };

  componentDidMount() {
    this.setState({ shelf: this.props.shelfID})
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
            <img className="book-cover"
              src={this.props.backgroundImage} 
              style={{ maxHeight: 200, width: "auto", height: "auto" }} 
              alt="book cover"/>
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


