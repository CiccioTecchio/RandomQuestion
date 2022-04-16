import { IValidFormQuestion, TypeQuestion } from '../../Interfaces';

export default function validatorQuestionJSON(inputFile:any):IValidFormQuestion {
  let isValidFormat:IValidFormQuestion = {isValid: false};
  if (Array.isArray(inputFile)) {
    inputFile as Array<any>;
    const idx = inputFile.findIndex((element:any) => {
      let wrongElement:boolean = false;
      if (typeof element !== 'object') wrongElement = true;
      else {
        wrongElement = (validateItemOfQuestion(element as Object) === -1)?false:true;
      }
      return wrongElement;
    });
    isValidFormat = (idx === -1)?{isValid: true}:{isValid: false, idxWrongElement: idx};
  }
  return isValidFormat;
}

function isAnArrayOfString(value:any):boolean {
  let isValid:boolean = false;
  if (Array.isArray(value)) {
    value as Array<any>;
    isValid = value.every((item:any)=> typeof item === 'string')?true:false;
  }
  return isValid;
}

function validateItemOfQuestion(element:any):number {
  const keys:Array<string> = Object.keys(element);
  const idxKey = keys.findIndex((k:string)=>{
    switch (k) {
      case 'type': {return (element[k] === TypeQuestion.Multiple || element[k] === TypeQuestion.Single? false : true);}
      case 'question':
      case 'tip': {return (typeof element[k] === 'string'? false : true);}
      case 'options':
      case 'answers': {return isAnArrayOfString(element[k])? false: true;}
      default: return true;
    }
  });
  return idxKey;
}
