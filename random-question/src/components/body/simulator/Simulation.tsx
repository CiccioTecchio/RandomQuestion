import React, { ReactElement } from 'react';
import { IQuestion } from '../home-page/Interfaces';
import './Simulation.scss';

export default function Simulation(props:{questions:Array<IQuestion>|undefined}): ReactElement {
  console.log(props.questions);
  return (
    <p>simulation-page</p>
  );
}
