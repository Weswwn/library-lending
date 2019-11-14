import React from 'react';
import BookEntry from './BookEntry.jsx';

class BookList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <ol>
          {this.props.availableBooks.map(book => <BookEntry book={book}/> )}
        </ol>
      </div>
    )
  }
}
export default BookList;