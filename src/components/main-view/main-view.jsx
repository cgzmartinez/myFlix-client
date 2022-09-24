import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';

import { Menubar } from '../navbar/navbar';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://cinema-spark.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  handleFav = (movieId, action) => {
    const { user, favoriteMovies } = this.state;
    const token = localStorage.getItem('token');
    if (token !== null && user !== null) {
      let url = `https://cinema-spark.herokuapp.com/users/${user}/${movieId}`;

      if (action === 'add') {
        this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
        axios
          .post(url, {}, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            alert(`Movie added to ${user} Favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });
        // Remove MovieID from Favorites (local state & webserver)
      } else if (action === 'remove') {
        this.setState({
          favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
        });
        axios
          .delete(`cinema-spark.herokuapp.com/users/${user}/${movieId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            alert(`Movie removed from ${user} favorite movies`);
            window.open(`/users/${user}`, '_self');
          })
          .catch((error) => console.error('removeFav Error ' + error));
      }
    }
  };

  render() {
    const { movies, user, favoriteMovies } = this.state;
    return (
      <Router>
        <Menubar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route exact path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route exact path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route exact path="/genre/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
          <Route
            path={`/users/${user}`}
            render={({ history }) => {
              if (!user) return <Redirect to="/" />;
              if (user.length === 0) return <div className="main-view">Loading...</div>;
              if (movies.length === 0) return <div className="main-view">Loading...</div>;
              return (
                <ProfileView
                  movies={movies}
                  user={user}
                  onBackClick={() => history.goBack()}
                  handleFav={this.handleFav}
                  favoriteMovies={favoriteMovies || []}
                />
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

export default MainView