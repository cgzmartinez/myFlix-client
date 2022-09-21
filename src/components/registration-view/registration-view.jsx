import React, { useState } from 'react';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegistration(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Register Here</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" required placeholder="Enter a Username" onChange={e => setUsername(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" minLength="8" required placeholder="Password must be 8 characters or more" onChange={e => setPassword(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" required placeholder="Enter a Valid Email Address" onChange={e => setEmail(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control type="birthday" placeholder="Enter Your Birthday" onChange={e => setBirthday(e.target.value)} />
                  </Form.Group>
                  <br></br>

                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  )
}