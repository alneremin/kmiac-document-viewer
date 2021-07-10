export {}

export interface ISOAPResponse {
    "HelloResponse": {
      "Message":String
    }
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
