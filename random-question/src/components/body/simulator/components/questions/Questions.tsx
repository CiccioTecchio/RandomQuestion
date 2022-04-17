import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { IQuestion, IQuestionAnswered, TypeQuestion } from '../../../home-page/Interfaces';
import QuestionFrame from '../question-frame/QuestionFrame';

export default function Questions(props:{questions:Array<IQuestion>, updateQAInSimulation:Function}): ReactElement {
  function initAnsweredQuestion():Array<IQuestionAnswered> {
    return props.questions.map(() => {
      return {selectedOptions: [], isFlagged: false};
    });
  };

  const [answeredQuestion, setAnsweredQuestion] = useState<Array<IQuestionAnswered>>(initAnsweredQuestion());
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);

  const changeQuestion = (newIdx:number) => {
    try {
      setCurrentQuestionIdx(newIdx);
      props.updateQAInSimulation({qaList: answeredQuestion, idxCurrentQ: newIdx});
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnsweredQuestion = (value:string, options:TypeQuestion) => {
    const tmp:Array<IQuestionAnswered> = [...answeredQuestion];
    switch (options) {
      case TypeQuestion.Single: {
        tmp[currentQuestionIdx] = {
          selectedOptions: [value], isFlagged: tmp[currentQuestionIdx].isFlagged
        };
        setAnsweredQuestion(tmp);
      }; break;

      case TypeQuestion.Multiple: {
        const idx = answeredQuestion[currentQuestionIdx].selectedOptions.findIndex((e:string)=> e === value);
        tmp[currentQuestionIdx] = {
          selectedOptions: (idx === -1)? [...tmp[currentQuestionIdx].selectedOptions, value]: tmp[currentQuestionIdx].selectedOptions.filter((opt:string) => value !== opt),
          isFlagged: tmp[currentQuestionIdx].isFlagged
        };
        setAnsweredQuestion(tmp);
      }
    }
    props.updateQAInSimulation({qaList: tmp, idxCurrentQ: currentQuestionIdx});
  };

  const disablePrev = () => currentQuestionIdx === 0;

  const disableNext = () => answeredQuestion[currentQuestionIdx].selectedOptions.length === 0 || currentQuestionIdx+1 === props.questions.length;

  return (
    <Row className='mt-3'>
      <Col className='align-self-center'>
        <Button variant="info" onClick={() => changeQuestion(currentQuestionIdx-1)} disabled={disablePrev()}>
          <FontAwesomeIcon icon={faArrowLeft as IconProp}/>
        </Button>
      </Col>
      <Col md={9} >
        <QuestionFrame question={props.questions[currentQuestionIdx]} idxQuestion={currentQuestionIdx} selectedOptions={answeredQuestion[currentQuestionIdx].selectedOptions} updateSelectedOptions={handleAnsweredQuestion}></QuestionFrame>
      </Col>
      <Col className='align-self-center d-flex justify-content-end'>
        { (currentQuestionIdx < props.questions.length -1)?<Button variant="info" onClick={() => changeQuestion(currentQuestionIdx+1)} disabled={disableNext()}>
          <FontAwesomeIcon icon={faArrowRight as IconProp}/>
        </Button>: <SendSimulation lastSelectedOptions={answeredQuestion[currentQuestionIdx].selectedOptions}/>}
      </Col>
    </Row>);
}

function SendSimulation(props:{lastSelectedOptions:Array<string>}):ReactElement {
  return (
    <Button variant='success' disabled={props.lastSelectedOptions.length === 0} onClick={() => console.log('termina simulazione')}>
      <FontAwesomeIcon icon={faPaperPlane as IconProp}/>
    </Button>
  );
}
