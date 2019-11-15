import React from 'react';
import BookEntry from './BookEntry.jsx';
import styled from 'styled-components';

const EachBook = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

class BookList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { availableBooks } = this.props
    return (
      <EachBook>
          {availableBooks.map(book => <BookEntry key={book.bookid} book={book}/> )}
      </EachBook>
    )
  }
}
export default BookList;