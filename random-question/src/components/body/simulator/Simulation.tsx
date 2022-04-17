import React, { ReactElement } from 'react';
import { IQuestion } from '../home-page/Interfaces';
import Questions from './components/questions/Questions';
import './Simulation.scss';

export default function Simulation(props:{questions:Array<IQuestion>}): ReactElement {
  return (
    <Questions questions={props.questions}></Questions>
  );
}
