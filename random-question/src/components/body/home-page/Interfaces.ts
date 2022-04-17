export enum TypeQuestion{
  // eslint-disable-next-line no-unused-vars
  Multiple = 'multiple',
  // eslint-disable-next-line no-unused-vars
  Single = 'single'
}
export interface IInputText{
  id: string;
  patter: string;
  regExp: RegExp;
  min: number;
  max: number;
  lang: {
    span: string;
    label: string;
  }
};

export interface IUploadedFile{
  name: string;
  contentFile: any;
  showAlert: boolean;
  msgAlert: string;
};

export interface IQuestion{
  type: TypeQuestion;
  question: string;
  options: Array<string>;
  answers: Array<string>;
  tip?:string;
}

export interface IValidFormQuestion{
  isValid:boolean;
  idxWrongElement?:number;
}

export interface ICanStart {
  isValidUpload: boolean;
  isValidPassingScore: boolean;
  isValidTimer: boolean;
}

export interface IPageToShow {
  showHome: boolean;
  showDoc: boolean;
  showSimulation: boolean;
  showPreSendSimulation: boolean;
  showResumeSimulation: boolean;
}

export interface IQuestionAnswered {
  selectedOptions: Array<string>;
  isFlagged:boolean;
}
