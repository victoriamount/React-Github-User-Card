import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Styled from 'styled-components';
import axios from 'axios';

const StyledFriendCard = Styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: 1%;
  background-color: black;

`

class FriendCard extends React.Component {
    constructor() {
        super();
        this.state = {
            friend: {}
        }
    }

    componentDidMount() {
        this.fetchFriend(this.props.friend.login)
    }

    fetchFriend = (userName) => {
        axios.get(`https://api.github.com/users/${userName}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    friend: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return(
            <StyledFriendCard>
                <Card style={{ width: '16rem' }}>
                    <Card.Img variant="top" src={this.state.friend.avatar_url} />
                    <Card.Body>
                        <Card.Title>{this.state.friend.login} </Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{this.state.friend.bio===null ? 'Studying CS' : this.state.friend.bio}</ListGroupItem>
                        <ListGroupItem>{this.state.friend.location===null ? 'Learning Remotely' : this.state.friend.location}</ListGroupItem>
                        <ListGroupItem>{this.state.friend.followers} followers</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href={this.state.friend.html_url}>GitHub</Card.Link>
                        <Card.Link href={this.state.friend.blog}>Social</Card.Link>
                    </Card.Body>
                </Card>
            </StyledFriendCard>
        )
    }
}


export default FriendCard;