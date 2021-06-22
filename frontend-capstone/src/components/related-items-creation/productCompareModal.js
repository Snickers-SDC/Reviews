import React from 'react';
import apiMaster from '../../apiMaster';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { GrFormCheckmark } from 'react-icons/gr';

class ProductCompareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidUpdate(prevProps) {
    if (this.props.clicked !== prevProps.clicked) {
      this.setState({ visible: this.props.clicked });
    }
  }

  render() {
    if (this.state.visible) {
      return (
        <Modal
          className="product-card-modal"
          show={this.state.visible}
          animation={true}
          centered
        >
          <Modal.Title className="product-card-modal-title">
            Comparing
          </Modal.Title>
          <Modal.Body className="show-grid card-compare-modal-body">
            <Container>
              <Row className="show-grid-row">
                <Col xs={6} md={4}>
                  <strong>{this.props.currentProductName}</strong>
                </Col>
                <Col xs={6} md={4}></Col>
                <Col xs={6} md={4}>
                  <strong>{this.props.relatedProductName}</strong>
                </Col>
              </Row>

              <Row className="show-grid-row">
                <Col xs={6} md={4}>
                  {this.props.characteristicsList.map((characteristic, i) => {
                    if (
                      this.props.currentProductFeatures.includes(characteristic)
                    ) {
                      return (
                        <ul className="characteristics-icon" key={i}>
                          <GrFormCheckmark className="product-features-checkmark" />
                        </ul>
                      );
                    } else {
                      return (
                        <ul className="characteristics-icon" key={i}>
                          <GrFormCheckmark className="product-features-checkmark-hidden" />
                        </ul>
                      );
                    }
                  })}
                </Col>
                <Col xs={6} md={4}>
                  {this.props.characteristicsList.map((characteristic, i) => {
                    return (
                      <ul className="characteristics" key={i}>
                        {characteristic}
                      </ul>
                    );
                  })}
                </Col>
                <Col xs={6} md={4}>
                  {this.props.characteristicsList.map((characteristic, i) => {
                    if (
                      this.props.relatedProductFeatures.includes(characteristic)
                    ) {
                      return (
                        <ul className="characteristics-icon" key={i}>
                          <GrFormCheckmark className="product-features-checkmark" />
                        </ul>
                      );
                    } else {
                      return (
                        <ul className="characteristics-icon" key={i}>
                          <GrFormCheckmark className="product-features-checkmark-hidden" />
                        </ul>
                      );
                    }
                  })}
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Button
            id="close-button-card"
            variant="outline-danger"
            size="sm"
            onClick={this.props.handleClick}
          >
            Close
          </Button>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

export default ProductCompareModal;
