import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { IQuestion, IQuestionAnswered, TypeQuestion } from '../../../home-page/Interfaces';
import QuestionFrame from '../question-frame/QuestionFrame';

export default function Questions(props:{questions:Array<IQuestion>, updateQAInSimulation:Function, currentQuestionIdx:number, changeQuestion:Function}): ReactElement {
  function initAnsweredQuestion():Array<IQuestionAnswered> {
    return props.questions.map(() => {
      return {selectedOptions: [], isFlagged: false};
    });
  };

  const [answeredQuestion, setAnsweredQuestion] = useState<Array<IQuestionAnswered>>(initAnsweredQuestion());

  const handleAnsweredQuestion = (value:string, options:TypeQuestion) => {
    const tmp:Array<IQuestionAnswered> = [...answeredQuestion];
    const currentQuestionIdx:number = props.currentQuestionIdx;
    switch (options) {
      case TypeQuestion.Single: {
        tmp[props.currentQuestionIdx] = {
          selectedOptions: [value], isFlagged: tmp[props.currentQuestionIdx].isFlagged
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

  const handleFlaggedQuestion = () => {
    const tmp:Array<IQuestionAnswered> = [...answeredQuestion];
    tmp[props.currentQuestionIdx].isFlagged = !tmp[props.currentQuestionIdx].isFlagged;
    setAnsweredQuestion(tmp);
    props.updateQAInSimulation({qaList: tmp, idxCurrentQ: props.currentQuestionIdx});
  };

  const disablePrev = () => props.currentQuestionIdx === 0;

  const disableNext = () => answeredQuestion[props.currentQuestionIdx].selectedOptions.length === 0 || props.currentQuestionIdx+1 === props.questions.length;

  return (
    <Row className='mt-3'>
      <Col className='align-self-center'>
        <Button variant="info" onClick={() => props.changeQuestion(props.currentQuestionIdx-1)} disabled={disablePrev()}>
          <FontAwesomeIcon icon={faArrowLeft as IconProp}/>
        </Button>
      </Col>
      <Col md={9} >
        <QuestionFrame question={props.questions[props.currentQuestionIdx]} idxQuestion={props.currentQuestionIdx}
          selectedOptions={answeredQuestion[props.currentQuestionIdx].selectedOptions} updateSelectedOptions={handleAnsweredQuestion}
          isFlagged={answeredQuestion[props.currentQuestionIdx].isFlagged} updateFlag={handleFlaggedQuestion}></QuestionFrame>
      </Col>
      <Col className='align-self-center d-flex justify-content-end'>
        { (props.currentQuestionIdx < props.questions.length -1)?<Button variant="info" onClick={() => props.changeQuestion(props.currentQuestionIdx+1)} disabled={disableNext()}>
          <FontAwesomeIcon icon={faArrowRight as IconProp}/>
        </Button>: <SendSimulation lastSelectedOptions={answeredQuestion[props.currentQuestionIdx].selectedOptions}/>}
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
