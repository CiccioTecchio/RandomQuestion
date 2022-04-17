import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFlag, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {ReactElement} from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { IQuestion, TypeQuestion } from '../../../home-page/Interfaces';
import './QuestionFrame.scss';

// ricordati di effettuare lo shuffle delle options quando recuperi il file in upload Btn
export default function QuestionFrame(props:{question:IQuestion, idxQuestion:number, selectedOptions:Array<string>, updateSelectedOptions:Function}): ReactElement {
  return (
    <Card border='primary'>
      <Card.Body>
        <Card.Title className='text-center' dangerouslySetInnerHTML={{__html: props.question.question}} />
        <Card.Body>
          <Form>
            <div className="mt-1 d-flex justify-content-between flex-gap">
              <div className="align-self-center mt-4">
                <Button variant="outline-danger">
                  <FontAwesomeIcon icon={faFlag as IconProp}/>
                </Button>
              </div>
              <div>
                {props.question.options.map((opt:string, i:number) =>
                  <Form.Check id={`options-${i}`} key={`options-${i}`} name={`group-${props.idxQuestion}`} value={opt} className="mt-2"
                    type={(props.question.type === TypeQuestion.Single)?'radio':'checkbox'} label={opt} checked={(props.selectedOptions.includes(opt)?true:false)}
                    onClick={(event) => props.updateSelectedOptions(event.currentTarget.value, props.question.type)} onChange={() => {}}/>
                )}
              </div>
              <div className='align-self-center mt-4'>
                { props.question.tip && (
                  <Button variant="outline-warning">
                    <FontAwesomeIcon icon={faLightbulb as IconProp}/>
                  </Button>
                )}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}
