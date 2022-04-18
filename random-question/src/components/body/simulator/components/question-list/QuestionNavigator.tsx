import React, { ReactElement } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { IQuestionAnswered } from '../../../home-page/Interfaces';
import './QuestionNavigator.scss';

// eslint-disable-next-line no-unused-vars
enum VariantBtn{
  // eslint-disable-next-line no-unused-vars
  Normal = 'outline-dark',
  // eslint-disable-next-line no-unused-vars
  Current = 'primary',
  // eslint-disable-next-line no-unused-vars
  Flagged = 'warning',
  // eslint-disable-next-line no-unused-vars
  SelectedAnswer = 'success'
}

// TODO implementare gestione della domanda flagged
export default function QuestionNavigator(props:{questionAnswered:Array<IQuestionAnswered>, currentQuestionIdx: number, changeQuestion:Function}):ReactElement {
  function chooseColorBtn(questionI:IQuestionAnswered, i:number, currentQuestionIdx:number):VariantBtn {
    let colorVariant:VariantBtn = VariantBtn.Normal;
    if (i === currentQuestionIdx) colorVariant = VariantBtn.Current;
    else {
      if (currentQuestionIdx !== i && !questionI.isFlagged && questionI.selectedOptions.length === 0) colorVariant = VariantBtn.Normal;
      else {
        if (currentQuestionIdx !== i && questionI.isFlagged) colorVariant = VariantBtn.Flagged;
        else {
          if (currentQuestionIdx !== i && questionI.selectedOptions.length > 0) colorVariant = VariantBtn.SelectedAnswer;
        }
      }
    }
    return colorVariant;
  };

  function isDisabledBtn(qList:Array<IQuestionAnswered>, i:number, currentQuestionIdx:number):boolean {
    const idx = qList.findIndex((q:IQuestionAnswered) => q.selectedOptions.length === 0);
    return (idx < i)?true:false;
  }

  return (
    <Row>
      <Col />
      <Col md={9}>
        <Card className="mt-3">
          <Card.Header className="text-center">Navigatore</Card.Header>
          <Card.Body>
            <Row>
              {props.questionAnswered.map((q:IQuestionAnswered, i:number) => (
                <BtnQuestion key={`q-${i}`} variant={chooseColorBtn(q, i, props.currentQuestionIdx)} idx={i+1}
                  isDisabled = {isDisabledBtn(props.questionAnswered, i, props.currentQuestionIdx)}
                  goToQuestion = {props.changeQuestion} />
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col />
    </Row>
  );
}

function BtnQuestion(props:{variant:VariantBtn, idx:number, isDisabled:boolean, goToQuestion:Function}):ReactElement {
  return (
    <Button variant={props.variant} className='idx-question btn-square m-1' size='sm' disabled={props.isDisabled}
      onClick={(e) => props.goToQuestion( parseInt(e.currentTarget.innerHTML)-1)}>{props.idx}</Button>
  );
}
