import { TypeQuestion } from '../../Interfaces';

export default function validatorQuestionJSON(inputFile:any): number {
  let idx:number = -1;
  if (Array.isArray(inputFile)) {
    inputFile as Array<any>;
    idx = inputFile.findIndex((element:any) => {
      let wrongElement:boolean = false;
      if (typeof element !== 'object') wrongElement = true;
      else {
        wrongElement = (validateItemOfQuestion(element as Object) === -1)?false:true;
      }
      return wrongElement;
    });
  }
  return idx;
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
