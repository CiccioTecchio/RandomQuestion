import React, {ReactElement} from 'react';
import { Card, Form } from 'react-bootstrap';
import { IQuestion, TypeQuestion } from '../../home-page/Interfaces';
import './QuestionFrame.scss';

function shuffleOptions(options:Array<string>): Array<string> {
  const l:number = options.length - 1;
  for (let i = 0; i < l+1; i++) {
    const rnd1:number = Math.floor(Math.random() * l);
    const rnd2:number = Math.floor(Math.random() * l);
    const tmp:string = options[rnd1];
    options[rnd1] = options[rnd2];
    options[rnd2] = tmp;
  }
  return options;
}
export default function QuestionFrame(props:{question:IQuestion, idxQuestion:number}): ReactElement {
  let options:Array<string> = [...props.question.options]; // si può evitare la deep-clone effettuando lo shuffle appena l'obj viene letto
  options = shuffleOptions(options);
  return (
    <Card border='secondary'>
      <Card.Body>
        <Card.Title className='text-center'>{props.question.question}</Card.Title>
        <Card.Body>
          <Form>
            {options.map((opt:string, i:number) => <Form.Check id={`options-${i}`} key={`options-${i}`} name={`group-${props.idxQuestion}`} type={(props.question.type === TypeQuestion.Single)?'radio':'checkbox'} label={opt} />)}
          </Form>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}
