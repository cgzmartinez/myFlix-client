import React from 'react';
import { Button, Image, Card, Container, Row, Col } from 'react-bootstrap';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
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
                    <span className="value">{movie.Genre.Name}</span>
                  </div>
                  <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                  </div>
                  <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
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