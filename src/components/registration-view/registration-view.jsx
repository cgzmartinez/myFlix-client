import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'

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
    <Container className="py-5 h-100">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col className="col-10 col-md-5 col-lg-4 col-xl-6">
          <CardGroup>
            <Card className="bg-dark text-white" style={{ borderRadius: '20px' }}>
              <Card.Body className="p-5 text-center">
                <Card.Title className="mb-4">SIGN UP</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label className="text-left">Username:</Form.Label>
                    <Form.Control
                      className="bg-dark text-white"
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="Must be more than 6 characters"
                    />
                    {values.usernameErr && (
                      <p className="validation-message">{values.usernameErr}</p>
                    )}
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please enter a valid username</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      className="bg-dark text-white"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Must be more than 6 characters"
                    />
                    {values.passwordErr && (
                      <p className="validation-message">{values.passwordErr}</p>
                    )}
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please enter a valid password</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      className="bg-dark text-white"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter a valid email"
                    />
                    {values.emailErr && (
                      <p className="validation-message">{values.emailErr}</p>
                    )}
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please enter a valid email</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-1" controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      className="bg-dark text-white"
                      type="birthday"
                      placeholder="MM/DD/YYYY"
                      onChange={e => setBirthday(e.target.value)} />
                  </Form.Group>
                  <br></br>
                  <Button className="mb-5" variant="primary" type="submit" onClick={handleSubmit}>
                    Register
                  </Button>
                  <p className="text-white-50">Already have an account?</p>
                  <Link to="/">
                    Login
                  </Link>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container >
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