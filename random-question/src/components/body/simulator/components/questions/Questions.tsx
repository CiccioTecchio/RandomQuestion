import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { IQuestion } from '../../../home-page/Interfaces';
import QuestionFrame from '../question-frame/QuestionFrame';

export default function Questions(props:{questions:Array<IQuestion>}): ReactElement {
  return (
    <Row className='mt-5'>
      <Col className='align-self-center'>
        <Button variant="outline-info">
          <FontAwesomeIcon icon={faArrowLeft as IconProp}/>
        </Button>
      </Col>
      <Col md={9} >
        <QuestionFrame question={props.questions[0]} idxQuestion={0}></QuestionFrame>
      </Col>
      <Col className='align-self-center d-flex justify-content-end'>
        <Button variant="outline-info">
          <FontAwesomeIcon icon={faArrowRight as IconProp}/>
        </Button>
      </Col>
    </Row>);
}
