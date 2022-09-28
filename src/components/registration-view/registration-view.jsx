import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    birthdayErr: '',
    emailErr: '',
  });

  const validate = () => {
    let isReq = true;
    setValues((prev) => {
      return {
        usernameErr: '',
        passwordErr: '',
        birthdayErr: '',
        emailErr: '',
      };
    });
    if (!username) {
      // setValues re-defines values through a callback that receives
      // the previous state of values & must return values updated
      setValues((prevValues) => {
        return { ...prevValues, usernameErr: 'Username is required.' };
      });
      isReq = false;
    } else if (username.length < 6) {
      setValues((prevValues) => {
        return {
          ...prevValues,
          usernameErr: 'Username must be at least 6 characters long!',
        };
      });
    }
    if (!password) {
      setValues((prevValues) => {
        return { ...prevValues, passwordErr: 'Password is required.' };
      });
      isReq = false;
    } else if (password.length < 6) {
      setValues((prevValues) => {
        return {
          ...prevValues,
          passwordErr: 'Password must be at least 6 characters long!',
        };
      });
      isReq = false;
    }
    if (!email) {
      setValues({
        prevValues,
        emailErr: 'Email is required.',
      });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues((prevValues) => {
        return { ...prevValues, emailErr: 'Enter a valid email address.' };
      });
      isReg = false;
    }
    if (!birthday) {
      setValues((prevValues) => {
        return { ...prevValues, birthdayErr: 'Enter a valid date.' };
      });
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://cinema-spark.herokuapp.com/users", {
          Username: username,   // ensure username and password are lowercase
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self');
        })
        .catch((e) => {
          console.log('error registering the user.');
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Sign up</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="Must be more than 6 characters"
                    />
                    {values.usernameErr && (
                      <p className="validation-message">{values.usernameErr}</p>
                    )}                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Must be more than 6 characters"
                    />
                    {values.passwordErr && (
                      <p className="validation-message">{values.passwordErr}</p>
                    )}                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter a valid email"
                    />
                    {values.emailErr && (
                      <p className="validation-message">{values.emailErr}</p>
                    )}                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control type="birthday" placeholder="MM/DD/YYYY" onChange={e => setBirthday(e.target.value)} />
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

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
};