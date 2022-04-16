import React, { ReactElement } from 'react';
import { Row } from 'react-bootstrap';
import { IQuestion } from '../home-page/Interfaces';
import QuestionFrame from './components/QuestionFrame';
import './Simulation.scss';

export default function Simulation(props:{questions:Array<IQuestion>}): ReactElement {
  return (
    <Row className='mt-5'>
      <QuestionFrame question={props.questions[0]} idxQuestion={0}></QuestionFrame>
    </Row>
  );
}
