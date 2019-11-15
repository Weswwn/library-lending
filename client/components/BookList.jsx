import React from 'react';
import BookEntry from './BookEntry.jsx';

class BookList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
          {this.props.availableBooks.map(book => <BookEntry key={book.bookid} book={book}/> )}
      </div>
    )
  }
}
export default BookList;