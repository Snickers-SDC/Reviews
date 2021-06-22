import React, { useState } from 'react';
import SearchQuestion from './searchQuestion';
import QuestionDisplay from './questionDisplay';
import AskQuestionModal from './questionForm.js';
import AddAnswerModal from './addAnswerModal.js';
import Button from 'react-bootstrap/Button';
import MoreQuestions from './moreQuestions';

const QuestionsAndAnswers = (props) => {
  const [AddQuestionModal, setAddQuestionModal] = useState(false);
  const [isAddAnswerModalOpen, setisAddAnswerModalOpen] = useState(false);

  if (AddQuestionModal) {
    return (
      <AskQuestionModal
        closeModal={() => setAddQuestionModal(false)}
        show={AddQuestionModal}
        name={props.currentProductName}
        productID={props.currentProductID}
      />
    );
  } else if (isAddAnswerModalOpen) {
    return (
      <AddAnswerModal
        closeModal={() => setisAddAnswerModalOpen(false)}
        show={isAddAnswerModalOpen}
        name={props.currentProductName}
        productID={props.currentProductID}
      />
    );
  } else {
    return (
      <div>
        <div className="widget-headings">Questions and Answers</div>
        <SearchQuestion />
        <div className="allCards">
          <QuestionDisplay
            productID={props.currentProductID}
            showModal={() => setisAddAnswerModalOpen(true)}
          />
        </div>
        <hr></hr>
        <MoreQuestions />
        <Button
          variant="success"
          className="qa-button"
          onClick={() => {
            setAddQuestionModal(true);
          }}
        >
          Add A Question
        </Button>
      </div>
    );
  }
};

export default QuestionsAndAnswers;
