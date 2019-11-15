import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EachBook = styled.div`
  margin: 30px 20px 30px 20px;
  padding: 20px 20px 20px 20px;
  border: 2px solid #1abc9c;
  border-radius: 25px;
  
`
const BookDetails = styled.div`
  margin-bottom: 30px;
`
class BookEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      membershipNumber: '',
      bookStatus: this.props.book.bookstatus, 
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
        if (response.data === false) {
          alert('You have entered an incorrect membership number!');
        } else {
          this.setState({
            bookStatus: true
          })
        }
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
        this.setState({
          bookStatus: false
        })
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
        <BookDetails>
          Book Title: {this.props.book.booktitle}
          <div>
            Book Status: {this.state.bookStatus === false ? 'Available!' : 'Already Rented!'}
          </div>
        </BookDetails>
        {this.state.bookStatus === false ?
          <form id="rent" onSubmit={this.onSubmit}>
              <div>Enter Username: 
                <input id="username" required minLength="1" type="text" onChange={this.onChange} placeholder="Enter Username"></input>
              </div>
              <div>Enter Membership Number: 
                <input id="membership" required minLength="1" type="number" onChange={this.onChange} placeholder="Enter Membership Number"></input>
              </div>
              <div>Enter Amount of Days You Wish to Rent: 
                <input id="durationOfRent" type="number" required minLength="1" min="1" max="7" onChange={this.onChange}></input>
              </div>
              <button>Click to Rent Book!</button>
          </form>
       : 
         <form id="return" onSubmit={this.onSubmit}>
            <div>Enter Membership Number: 
              <input id="username" required minLength="1" type="text" onChange={this.onChange} placeholder="Enter Membership Number"></input>
            </div>
            <div>Enter Membership Number: 
                <input id="membership" required minLength="1" type="number" onChange={this.onChange} placeholder="Enter Membership Number"></input>
              </div>
            <button>Click Return Book!</button>  
         </form>}
      </EachBook>
    )
  }
}
export default BookEntry;