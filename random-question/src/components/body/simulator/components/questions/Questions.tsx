/* eslint-disable no-unused-vars */
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { IQuestion, IQuestionAnswered, TypeQuestion } from '../../../home-page/Interfaces';
import QuestionFrame from '../question-frame/QuestionFrame';

export default function Questions(props:{questions:Array<IQuestion>}): ReactElement {
  function initAnsweredQuestion():Array<IQuestionAnswered> {
    return props.questions.map(() => {
      return {selectedOptions: []};
    });
  };

  const [answeredQuestion, setAnsweredQuestion] = useState<Array<IQuestionAnswered>>(initAnsweredQuestion());
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);

  const changeQuestion = (newIdx:number) => {
    try {
      setCurrentQuestionIdx(newIdx);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnsweredQuestion = (value:string, options:TypeQuestion) => {
    switch (options) {
      case TypeQuestion.Single: {
        const tmp:Array<IQuestionAnswered> = [...answeredQuestion];
        tmp[currentQuestionIdx] = {
          selectedOptions: [value]
        };
        setAnsweredQuestion(tmp);
      }; break;

      case TypeQuestion.Multiple: {
        const tmp:Array<IQuestionAnswered> = [...answeredQuestion];
        const idx = answeredQuestion[currentQuestionIdx].selectedOptions.findIndex((e:string)=> e === value);

        tmp[currentQuestionIdx] = {
          selectedOptions: (idx === -1)? [...tmp[currentQuestionIdx].selectedOptions, value]: tmp[currentQuestionIdx].selectedOptions.filter((opt:string) => value !== opt)
        };
        setAnsweredQuestion(tmp);
      }
    }
  };

  const disablePrev = () => currentQuestionIdx === 0;

  const disableNext = () => answeredQuestion[currentQuestionIdx].selectedOptions.length === 0 || currentQuestionIdx+1 === props.questions.length;

  return (
    <Row className='mt-5'>
      <Col className='align-self-center'>
        <Button variant="outline-info" onClick={() => changeQuestion(currentQuestionIdx-1)} disabled={disablePrev()}>
          <FontAwesomeIcon icon={faArrowLeft as IconProp}/>
        </Button>
      </Col>
      <Col md={9} >
        <QuestionFrame question={props.questions[currentQuestionIdx]} idxQuestion={currentQuestionIdx} selectedOptions={answeredQuestion[currentQuestionIdx].selectedOptions} updateSelectedOptions={handleAnsweredQuestion}></QuestionFrame>
      </Col>
      <Col className='align-self-center d-flex justify-content-end'>
        <Button variant="outline-info" onClick={() => changeQuestion(currentQuestionIdx+1)} disabled={disableNext()}>
          <FontAwesomeIcon icon={faArrowRight as IconProp}/>
        </Button>
      </Col>
    </Row>);
}
