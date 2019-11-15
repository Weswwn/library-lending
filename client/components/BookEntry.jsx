import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EachBook = styled.div`
  border: 1 black;
`

class BookEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      membershipNumber: '',
      bookStatus: [],
      durationOfRental: 0
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onReturn = this.onReturn.bind(this);
  }
  onSubmit(e) {
    if (e.target.id === 'return') {
      this.onReturn(e)
    } else {
      e.preventDefault();
      let dateRented = new Date(Date.now());
      let dueDate = new Date(Date.now());
      dueDate.setDate(dueDate.getDate() + parseInt(this.state.durationOfRental));
  
      axios.post('/rent', {
          userName: this.state.userName,
          membershipNumber: parseInt(this.state.membershipNumber),
          bookID: this.props.book.bookid,
          dateRented: dateRented,
          durationOfRental: this.state.durationOfRental,
          returnDate: dueDate
        })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  onReturn(e) {
    e.preventDefault();
    axios.put('/return' , {
      membershipNumber: this.state.membershipNumber,
      bookID: this.props.book.bookid
    })
    .then((response) => {
      if (response.data === false) {
        alert('Incorrect membership number or you have not checked out this book!')
      } else {
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  onChange(e) {
    if (e.target.id === 'membership') {
      this.setState({
        membershipNumber: e.target.value
      })
    }
    if (e.target.id ==='durationOfRent') {
      this.setState({
        durationOfRental: e.target.value
      })
    }
    if (e.target.id === 'username') {
      this.setState({
        userName: e.target.value
      })
    }
  }
  render() {
    return (
      <EachBook>
        Book Title: {this.props.book.booktitle}
        <div>{' '} </div>
        Book Status: {this.props.book.bookstatus === false ? 'Available!' : 'Not Available'}
        {this.props.book.bookstatus === false ?
          <form id="rent" onSubmit={this.onSubmit}>
              <div>Enter Username: 
                <input id="username" required minLength="1" type="text" onChange={this.onChange} placeholder="Enter Username"></input>
              </div>
              <div>Enter Membership Number: 
                <input id="membership" required minLength="1" type="number" onChange={this.onChange} placeholder="Enter Membership Number"></input>
              </div>
              <div>Enter Amount of Days You Wish to Rent: 
                <input id="durationOfRent" type="number" min="1" max="7" onChange={this.onChange}></input>
              </div>
              <button>Click to Rent Book!</button>
          </form>
       : 
         <form id="return" onSubmit={this.onSubmit}>
            <div>Enter Membership Number: 
              <input id="membership" required minLength="1" type="text" onChange={this.onChange} placeholder="Enter Membership Number"></input>
            </div>
            <button>Click Return Book!</button>  
         </form>}
      </EachBook>
    )
  }
}
export default BookEntry;