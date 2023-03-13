import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button, Container, Col, Row } from 'react-bootstrap';

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
            <Container>
                <Card className='mt-5 bg-dark text-white' style={{ borderRadius: '15px' }}>
                    <Card.Body>
                        <Row className="mt-3 pl-3 pr-3">
                            <Col className="label">Director: </Col>
                            <Col className="value">{director.Name}</Col>
                        </Row>
                        <Row className="mt-3 pl-3 pr-3">
                            <Col className="label">Bio: </Col>
                            <Col className="value">{director.Bio}</Col>
                        </Row>
                        <Row className="mt-3 pl-3 pr-3">
                            <Col className="label">Birthday: </Col>
                            <Col className="value">{director.Birth}</Col>
                        </Row>
                        <Button
                            className="mt-5 ml-2 mb-2"
                            onClick={() => {
                                onBackClick();
                            }}
                            variant="primary"
                        >
                            Back
                        </Button>
                    </Card.Body>
                </Card>
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