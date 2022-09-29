import React from 'react';
import PropTypes from 'prop-types';

import { Button, Container, Col, Row, Card } from 'react-bootstrap';

export class GenreView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Card className='mt-5 bg-dark text-white' style={{ borderRadius: '15px' }}>
          <Card.Body>
            <Row className="mt-3 pl-3 pr-3">
              <Col className="label">Genre:</Col>
              <Col className="value">{genre.Name}</Col>
            </Row>
          </Card.Body>
          <Card.Body>
            <Row className="mt-3 pl-3 pr-3">
              <Col className="label">Description:</Col>
              <Col className="value">{genre.Description}</Col>
            </Row>
            <Button
              className='mt-4'
              onClick={() => {
                onBackClick();
              }}
              variant="primary"
            >
              Back
            </Button>
          </Card.Body>
        </Card>
      </Container >
    );
  }
}
GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};