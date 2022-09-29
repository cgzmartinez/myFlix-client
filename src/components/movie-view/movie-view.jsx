import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Image, Card, Container, Row, Col } from 'react-bootstrap';

import './movie-view.scss'

export class MovieView extends React.Component {

  addFavoriteMovie(e) {
    const { movie } = this.props;
    e.preventDefault();
    axios
      .post(
        `https://cinema-spark.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/Movies/${movie._id}`,
        { username: localStorage.getItem("user") },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        alert(`${movie.Title} successfully added to your favorites`);
      })
      .then((res) => {
        document.location.reload(true);
      })
      .catch((error) => {
        alert(`${movie.Title} not added to your favorites` + error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card className="bg-dark mt-4" style={{ borderRadius: '10px' }}>
              <Card.Body>
                <div className="movie-view bg-dark text-white fixed">
                  <div className="movie-poster" variant="top" >
                    <Image className="movie-img mx-auto" crossOrigin="anonymous" src={movie.ImagePath} />
                  </div>
                  <div className="movie-title text-center mt-4">
                    <span className="value">{movie.Title}</span>
                  </div>
                  <div className="movie-description pl-5 pr-5 mt-3">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                  </div>
                  <div className="movie-genre pl-5 pr-5 mt-3">
                    <span className="label">Genre: </span>
                    <Link to={`/genre/${movie.Genre.Name}`}>
                      <span className="genre-link link">{movie.Genre.Name}</span>
                    </Link>
                  </div>
                  <div className="movie-director pl-5 pr-5">
                    <span className="label">Director: </span>
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <span className="director-link link">{movie.Director.Name}</span>
                    </Link>
                  </div>
                  <br></br>
                  <Button className="ml-5 mr-5" variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
                  <br></br>
                  <br></br>
                  <Button
                    className="ml-5 mr-5"
                    variant="outline-primary"
                    value={movie._id}
                    onClick={(e) => this.addFavoriteMovie(e, movie)}
                  >
                    Add to Favorites
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    );
  }
}

export default MovieView;