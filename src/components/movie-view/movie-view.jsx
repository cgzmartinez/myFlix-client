import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Image, Card, Container, Row, Col } from 'react-bootstrap';

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
            <Card>
              <Card.Body>
                <div className="movie-view">
                  <div className="movie-poster" variant="top" >
                    <Image className="mx-auto d-block" crossOrigin="anonymous" src={movie.ImagePath} fluid />
                  </div>
                  <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                  </div>
                  <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                  </div>
                  <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <Link to={`/genre/${movie.Genre.Name}`}>
                      <span className="genre-link link">{movie.Genre.Name}</span>
                    </Link>
                  </div>
                  <div className="movie-director">
                    <span className="label">Director: </span>
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <span className="director-link link">{movie.Director.Name}</span>
                    </Link>
                  </div>
                  <br></br>
                  <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
                  <br></br>
                  <br></br>
                  <Button
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