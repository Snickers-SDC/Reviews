import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { displayAmountState, allQuestionsState } from './qa-atoms';

const MoreQuestions = (props) => {
  let qLength = useRecoilValue(allQuestionsState).length;
  const [questionsLen, setquestionsLen] = useRecoilState(displayAmountState);
  const [display, setDisplay] = useState(true);
  if (qLength <= 4) {
    return <></>;
  } else {
    return (
      <>
        <Button
          className="qa-button"
          variant="primary"
          onClick={() => {
            setquestionsLen(qLength);
            setDisplay(false);
          }}
          style={{ display: display ? 'inline' : 'none' }}
        >
          More Questions
        </Button>{' '}
      </>
    );
  }
};

export default MoreQuestions;
