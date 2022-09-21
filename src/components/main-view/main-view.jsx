import React from 'react';
import axios from 'axios';
import { Container, Col, Row, Navbar, Nav } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    }
  }

  componentDidMount() {
    axios.get('https://cinema-spark.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegistration(register) {
    this.setState({
      register
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!register) return <RegistrationView onRegistration={register => this.onRegistration(register)} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          ))
        }
      </Row>
    );
  }

}

export default MainView