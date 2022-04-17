import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFlag, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {ReactElement, useRef, useState} from 'react';
import { Card, Form, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { IQuestion, TypeQuestion } from '../../../home-page/Interfaces';
import './QuestionFrame.scss';

// ricordati di effettuare lo shuffle delle options quando recuperi il file in upload Btn
export default function QuestionFrame(props:{question:IQuestion, idxQuestion:number, selectedOptions:Array<string>, updateSelectedOptions:Function}): ReactElement {
  const [showTip, setShowTip] = useState(false);
  const target = useRef(null);
  const renderTooltip = (p:any) => (
    <Tooltip id='tip-tooltip' {...p}>
      <span dangerouslySetInnerHTML={{__html: (props.question.tip)?props.question.tip:''}}></span>
    </Tooltip>
  );
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
                  <OverlayTrigger placement='bottom' delay={{ show: 150, hide: 400 }} overlay={renderTooltip}>
                    <Button variant='outline-warning' ref={target} onClick={() => setShowTip(!showTip)}>
                      <FontAwesomeIcon icon={faLightbulb as IconProp} />
                    </Button>
                  </OverlayTrigger>
                )}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}
