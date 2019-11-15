import React from 'react';
import axios from 'axios';
import BookList from './components/BookList.jsx';
import styled from 'styled-components';

const MainButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 20px 20px 20px;
`

const ButtonStyle = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 1.5em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
  display: block;
  margin: 10px 10px 10px 10px;
  outline: 0;
  box-shadow: none!important;
  :hover {
    color: red;
    cursor: pointer;
  }
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        availableBooks: []
    }
    this.filterBooks = this.filterBooks.bind(this);
    this.getAllBooks = this.getAllBooks.bind(this);
  }
  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks(filter = false) {
    axios.get('/books')
      .then((response) => {
        if (filter === true) {
          let tempArray = [...response.data];
          tempArray = tempArray.filter(book => book.bookstatus === false);
          console.log(tempArray);
          this.setState({
            availableBooks: tempArray
          })
        } else {
          this.setState ({
            availableBooks: response.data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  filterBooks() {
    this.getAllBooks(true)
  }

  render () {
    return (
      <div>
        <MainButtons>
          <ButtonStyle onClick={this.filterBooks}>See Available Books</ButtonStyle>
          <ButtonStyle onClick={this.getAllBooks}>See All Books</ButtonStyle>
        </MainButtons>
        <span>
          <BookList availableBooks={this.state.availableBooks}/>
        </span>
      </div>
    )
  }
}
export default App;