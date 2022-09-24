import React from 'react';
import PropTypes from 'prop-types';

import { Button, Container, Col, Row } from 'react-bootstrap';

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
        <Row className="mt-3">
          <Col className="label">Genre:</Col>
          <Col className="value">{genre.Name}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Description:</Col>
          <Col className="value">{genre.Description}</Col>
        </Row>
        <Button
          onClick={() => {
            onBackClick();
          }}
          variant="primary"
        >
          Back
        </Button>
      </Container>
    );
  }
}
GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};