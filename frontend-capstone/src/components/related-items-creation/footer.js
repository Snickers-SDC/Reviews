import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { AiOutlineCopyright } from 'react-icons/ai';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };

    this.msConverter = this.msConverter.bind(this);
  }

  msConverter(duration) {
    let formattedTime;
    // format ms
    if (duration < 1000) {
      formattedTime = Math.round(duration) + 'ms';
    } else if (duration < 60000) {
      // format and convert to s
      formattedTime = Math.round(duration / 1000) + 's';
    } else if (duration < 3600000) {
      // format and convert to mins
      formattedTime = (duration / 60000).toFixed(1) + 'm';
    } else {
      // format and convert to hours
      formattedTime = (duration / 3600000).toFixed(1) + 'h';
    }
    return formattedTime;
  }

  render() {
    if (this.state.visible) {
      return (
        <Modal size="lg" show={this.state.visible} animation={true} centered>
          <Modal.Body>
            <div className="footer-modal-title">User Activity Monitor</div>
            <Container>
              <Row className="footer-data-row">
                <Col xs={6} md={3}>
                  <strong>User Token</strong>
                </Col>
                <Col xs={6} md={3}>
                  <strong>Time Since Visit</strong>
                </Col>
                <Col xs={6} md={6}>
                  <strong>Element Clicked</strong>
                </Col>
              </Row>
            </Container>
            <Container className="footer-modal-body">
              {this.props.clickData.map((action, i) => {
                return (
                  <Row className="footer-data-row">
                    <Col xs={6} md={3}>
                      {this.props.userToken}
                    </Col>
                    <Col xs={6} md={3}>
                      {this.msConverter(action.timeSinceVisit)}
                    </Col>
                    <Col className="footer-element-clicked" xs={6} md={6}>
                      {action.elementClicked}
                    </Col>
                  </Row>
                );
              })}
            </Container>
          </Modal.Body>
          <Button
            id="footer-close-button-card"
            variant="outline-danger"
            size="sm"
            onClick={() => {
              this.setState({ visible: false });
            }}
          >
            Close
          </Button>
        </Modal>
      );
    } else {
      return (
        <div>
          <span
            className="footer-admin"
            onClick={() => {
              this.setState({ visible: true });
            }}
          >
            Admin
          </span>
          Supernova <AiOutlineCopyright /> 2020
        </div>
      );
    }
  }
}

export default Footer;
