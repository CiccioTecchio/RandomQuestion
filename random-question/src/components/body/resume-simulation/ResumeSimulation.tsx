import React, { ReactElement } from 'react';
import './ResumeSimulation.scss';

export default function ResumeSimulation(props:{passingScore:number}):ReactElement {
  return (
    <p>Hi! my name is resume-simulation; the passing score is <b>{props.passingScore}</b></p>
  );
}
