import React, { useState } from 'react';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 6) {
      setUsernameErr('Username must be at least 6 characters long!');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be 6 characters long!');
      isReq = false;
    }

    return isReq;
  }
  const handleSubmit = (e) => {

    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      e.preventDefault();
      /* Send a request to the server for authentication */
      axios.post('https://cinema-spark.herokuapp.com/login', {
        username: username,
        password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
    }
    console.log(username, password);
  };

  return (
    <Container className="py-5 h-100">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col className="col-12 col-md-8 col-lg-6 col-xl-5">
          <CardGroup>
            <Card className="bg-dark text-white" style={{ borderRadius: '20px' }}>
              <Card.Body className="p-5 text-center">
                <Card.Title className="mb-4">LOGIN</Card.Title>
                <p className="text-white-50 mb-4">Please enter your login and password!</p>
                <Form>
                  <Form.Group className="mb-4" controlId="formUsername">
                    <Form.Control className="bg-dark text-white" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    {/* code added here to display validation error */}
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group className="mb-4 " controlId="formPassword">
                    <Form.Control className="bg-dark text-white" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    {/* code added here to display validation error */}
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Button className="mb-3 btn-lg px-5" variant="outline-primary" type="submit" onClick={handleSubmit}>
                    Log In
                  </Button>
                  <p className="text-white-50">Don't have an account?</p>
                  <Link to="register">
                    Sign Up
                  </Link>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};