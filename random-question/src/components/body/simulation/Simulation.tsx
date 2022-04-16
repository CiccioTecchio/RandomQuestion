import React, { ReactElement } from 'react';
import { IQuestion } from '../home-page/Interfaces';
import './Simulation.scss';

export default function Simulation(props:{question:IQuestion|undefined}): ReactElement {
  console.log(props.question);
  return (
    <p>simulation-page</p>
  );
}
