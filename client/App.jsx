import React from 'react';
import axios from 'axios';

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
        this.setState = ({
            availableBooks: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render () {
    return (
      <div>Hello</div>
      
    )
  }
}
export default App;