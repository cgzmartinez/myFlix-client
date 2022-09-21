import React, { useState } from 'react';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Sign In</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password must be 8 characters or more" onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button className="mb-3" variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button className="mb-3 d-flex" variant="primary" type="submit" onClick={handleSubmit}>
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}