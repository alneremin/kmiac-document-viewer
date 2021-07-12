export { }

export interface ISOAPData {
  "HelloResponse": {
    "Message": String
  }
}

export interface ISOAPData {
  "HelloResponse": {
    "Message": String
  }
}

export interface ISOAPResponse {
  getResponse: (value: any) => any,
  state: String | undefined,
  // onChange: (value: any) => void,
  // search: boolean
}

export enum DialogResultCode {
  OK, // OK button and result OK
  YES, // YES button
  NO, // NO button
  ERROR, // OK button but operation error
  CANCEL,

  UNSATISFIED_REQUEST_SEARCH_PRODUCT,

  QUESTION
}

export interface IDialogResult {
  code: DialogResultCode;
  error?: string | undefined;
  value?: number;
}
export interface IDialogResultProps {
  onResult: (result: IDialogResult) => void;
  onCancel: () => void;
}
