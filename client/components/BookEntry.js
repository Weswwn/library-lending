import React from 'react';
import styled from 'styled-components';

class BookEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      membershipNumber: '',
      bookStatus: []
    }
  }
  render() {
    return (
      <div>
        {this.props.bookTitle}
        {this.props.bookStatus}
        {this.state.bookStatus === false ? 
        <form>
            <input type="text" placeholder="Enter Username"></input>
            <input type="text" placeholder="Enter Membership Number"></input>
            <button>Click to Rent Book!</button>
        </form>    
      : 
        <form>
            <input type="text" placeholder="Enter Username"></input>
            <input type="text" placeholder="Enter Membership Number"></input>
            <button>Click Return Book!</button>  
        </form>}
      </div>
    )
  }
}
export default BookEntry;