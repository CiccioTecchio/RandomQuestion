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
};
