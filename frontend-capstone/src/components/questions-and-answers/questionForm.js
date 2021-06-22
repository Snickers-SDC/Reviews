import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import apiMaster from '../../apiMaster';

const AskQuestionModal = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [show, setShow] = useState(props.show);

  const onSubmit = (data) => {
    apiMaster
      .askQuestion(props.productID, data.body, data.name, data.email)
      .then((data) => {
        setShow(false);
        props.closeModal();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      onHide={() => {
        setShow(false);
        props.closeModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h1>Ask Your Question</h1>
          <p>About the {props.name}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="name">
            <Form.Label>* What is your nickname</Form.Label>
            <Form.Control
              type="name"
              name="name"
              placeholder="Example: jackson11!"
              maxLength={60}
              ref={register({
                required: true,
              })}
            />
            <Form.Text className="text-muted">
              For privacy reasons, do not use your full name or email address
              {errors.name && <p style={{ color: 'red' }}>Name is required</p>}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>* Your Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              ref={register({
                required: true,
              })}
              maxLength={60}
            />
            <Form.Text className="text-muted">
              {errors.email && (
                <p style={{ color: 'red' }}>Email is required</p>
              )}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="question">
            <Form.Label>* Your Question</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Ask Question Here"
              name="body"
              ref={register({ required: true })}
              maxLength={1000}
            />
            <Form.Text className="text-muted">
              {errors.body && (
                <p style={{ color: 'red' }}>Question is required</p>
              )}
            </Form.Text>
          </Form.Group>
          <Button variant="success" type="submit" className="qa-button">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
export default AskQuestionModal;
