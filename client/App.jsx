import React from 'react';
import axios from 'axios';
import BookList from './components/BookList.jsx';

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
        <button onClick={this.filterBooks}>See Only Available Books</button>
        <button onClick={this.getAllBooks}>See All Books</button>
        <span>
          <BookList availableBooks={this.state.availableBooks}/>
        </span>
      </div>
    )
  }
}
export default App;