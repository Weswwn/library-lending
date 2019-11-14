import React from 'react';
import axios from 'axios';
import BookList from './components/BookList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        availableBooks: []
    }
  }
  componentDidMount() {
    axios.get('/books')
      .then((response) => {
        console.log(response.data);
        this.setState ({
          availableBooks: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render () {
    return (
      <BookList availableBooks={this.state.availableBooks}/> 
    )
  }
}
export default App;