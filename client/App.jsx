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
    this.updateList = this.updateList.bind(this);
  }
  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    axios.get('/books')
      .then((response) => {
        this.setState ({
          availableBooks: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  filterBooks() {
    let { availableBooks } = this.state;
    let tempArray = [...availableBooks];
      tempArray = tempArray.filter(book => book.bookstatus === false);
      this.setState({
        availableBooks: tempArray
      })
  }

  updateList(bookStatus, bookID) {
    let { availableBooks } = this.state;
    let temp = [...availableBooks];

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].bookid === bookID) {
        temp[i].bookstatus = bookStatus;
      }
    }
    this.setState({
      availableBooks: temp
    })
  }

  render () {
    return (
      <div>
        <MainButtons>
          <ButtonStyle onClick={this.filterBooks}>See Available Books</ButtonStyle>
          <ButtonStyle onClick={this.getAllBooks}>See All Books</ButtonStyle>
        </MainButtons>
        <span>
          <BookList updateList={this.updateList} availableBooks={this.state.availableBooks}/>
        </span>
      </div>
    )
  }
}
export default App;