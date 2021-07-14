export { }

export interface ISearchRegistryItemRequest {
  surname: String,
  name: String,
  patrname: String,
  birthdate: String
}

export interface IGetContentRequest {
  amdId: String,
}

export interface ISearchRegistryItem {
  amdId: String,
  localUid: String,
  registrationDate: String,
}

export interface IGetContentItem {
  data: String,
  type: String,
}

export interface ISearchRegistryItemData {
  docs: ISearchRegistryItem[],
  onClick: (element: any) => boolean
}

export interface ISOAPResponse {
  getSearchResponse: (value: ISearchRegistryItem[]) => any,
  searchRequest: ISearchRegistryItemRequest | undefined,
  getContentResponse: (value: IGetContentItem) => any,
  contentRequest: IGetContentRequest | undefined,
  setError: (message: String) => void,
  clientId: String | undefined,
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

export interface ITableColumn {
  name: string;
  propertyName: string;
  width: number;
  order: number;
  type: string;
  alignLeft?: boolean;
}

export interface ITableColumnHeader {
  index: number;
  name: string;
  propertyName: string;
}