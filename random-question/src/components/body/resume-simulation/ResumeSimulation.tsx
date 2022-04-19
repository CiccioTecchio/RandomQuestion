import React, { ReactElement } from 'react';
import { IQuestion, IQuestionAnswered } from '../home-page/Interfaces';
import './ResumeSimulation.scss';

export default function ResumeSimulation(props:{passingScore:number, question:Array<IQuestion>, qaList:Array<IQuestionAnswered>}):ReactElement {
  return (
    <>
      <p>Hi! my name is resume-simulation; the passing score is <b>{props.passingScore}</b>%</p>
      <p>{JSON.stringify(props.question)}</p>
      <p>{JSON.stringify(props.qaList)}</p>
    </>
  );
}
