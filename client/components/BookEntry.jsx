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
const FormButton = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  border: none;
  background: none;
  display: block;
  margin: 10px 10px 10px 10px; 
  outline: 0;
  box-shadow: none!important;
  :hover {
    color: red;
    cursor: pointer;
  }
`
const TextBox = styled.input`
  display: flex;
  border: 0;
  outline: 0;
  border-bottom: 1px solid black;
  width: 180px;
`
const FormStyle = styled.form`
  width: 250px;
  height: 130px;
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
      let { updateList, book} = this.props;
  
      axios.post('/rent', {
          userName: this.state.userName,
          membershipNumber: parseInt(this.state.membershipNumber),
          bookID: book.bookid,
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
          updateList(true, book.bookid)
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  onReturn(e) {
    e.preventDefault();
    let { updateList, book } = this.props;
    axios.put('/return' , {
      membershipNumber: this.state.membershipNumber,
      bookID: book.bookid
    })
    .then((response) => {
      if (response.data === false) {
        alert('Incorrect membership number or you have not checked out this book!')
      } else {
        this.setState({
          bookStatus: false
        })
        updateList(false, book.bookid)
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
          <FormStyle id="rent" onSubmit={this.onSubmit}>
              <div>Username: 
                <TextBox id="username" required minLength="1" type="text" onChange={this.onChange} placeholder="Enter Username"></TextBox>
              </div>
              <div>Membership Number: 
                <TextBox id="membership" required minLength="1" type="number" onChange={this.onChange} placeholder="Enter Membership Number"></TextBox>
              </div>
              <div>Number of Days: 
                <TextBox id="durationOfRent" type="number" required minLength="1" min="1" max="7" onChange={this.onChange}></TextBox>
              </div>
              <FormButton>Click to Rent Book!</FormButton>
          </FormStyle>
       : 
         <FormStyle id="return" onSubmit={this.onSubmit}>
            <div>Username: 
              <TextBox id="username" required minLength="1" type="text" onChange={this.onChange} placeholder="Enter Membership Number"></TextBox>
            </div>
            <div>Membership Number: 
                <TextBox id="membership" required minLength="1" type="number" onChange={this.onChange} placeholder="Enter Membership Number"></TextBox>
              </div>
            <FormButton>Click Return Book!</FormButton>  
         </FormStyle>}
      </EachBook>
    )
  }
}
export default BookEntry;