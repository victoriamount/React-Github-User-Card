import React from 'react';
import axios from 'axios';
import FriendCard from './components/FriendCard'
import 'bootstrap/dist/css/bootstrap.min.css';
import Styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import './App.css';



const StyledPage = Styled.div`
  background-color: #DBD3D8;
  h1{
    text-align: center;
    color: #223843;
  }
`

// const StyledFriendCard = Styled.div`
//   display: flex;
//   flex-flow: row wrap;
//   justify-content: space-around;

// `
const StyledContent = Styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  background-color: #DBD3D8;
  .friendContainer{
    background-color: #DBD3D8;
  }
  .cardContainer {
    align-items: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`

class App extends React.Component {
  state = {
    user: {},
    friends: []
  }

  componentDidMount() {
    this.fetchUser('victoriamount')
    this.fetchFriends('victoriamount')
  }

  

  fetchUser = (userName) => {
    axios.get(`https://api.github.com/users/${userName}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          user: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  fetchFriends = (userName) => {
    axios.get(`https://api.github.com/users/${userName}/following`)
      .then(res => {
        console.log(res.data)
        this.setState({
          friends: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() { 
    return (
      <StyledPage>
        <header>
          <h1>{this.state.user.name}'s GitHub</h1>
        </header>
        <StyledContent>
          <div className='cardContainer card'>
            <Card style={{ width: '36rem' }}>
              <Card.Img variant="top" src={this.state.user.avatar_url} />
              <Card.Body>
                <Card.Title>{this.state.user.login}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{this.state.user.bio}</ListGroupItem>
                <ListGroupItem>{this.state.user.location}</ListGroupItem>
                <ListGroupItem>{this.state.user.followers} followers</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href={this.state.user.html_url}>GitHub</Card.Link>
                <Card.Link href={this.state.user.blog}>Social</Card.Link>
              </Card.Body>
            </Card>
          </div>    
          <div className='friendContainer card'>
            {this.state.friends.map((friend, index) => 
              (
                <FriendCard friend={friend} key={index} />
              )
            )}
          </div>
        </StyledContent>
      </StyledPage>
    )
  }

}

export default App;
