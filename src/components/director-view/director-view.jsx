import React from 'react';
import PropTypes from 'prop-types';

import { Button, Container, Col, Row } from 'react-bootstrap';

export class DirectorView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container className="director-view">
        <Row className="mt-3">
          <Col className="label">Director: </Col>
          <Col className="value">{director.Name}</Col>
          <Row className="mt-3">
            <Col className="label">Bio: </Col>
            <Col className="value">{director.Bio}</Col>
          </Row>
          <Row className="mt-3">
            <div>
              <Col className="label">Birth: </Col>
              <Col className="value mt-3 ml-3 ">{director.Birth}</Col>.
            </div>
          </Row>
          <Row>
            <Col>
              <div>
                <Button
                  className=""
                  onClick={() => {
                    onBackClick();
                  }}
                >
                  Back
                </Button>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
export default DirectorView;