import logo from './logo.svg';
import './App.css';
import DocumentTable from './components/tables/DocumentTable';
import Table from './components/tables/Table';
import SOAPResponse from './components/soap/SOAPResponse';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useInput } from "./utils/hooks";
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import SearchPanel from './components/search/SearchPanel';
// import { Document, Page } from 'react-pdf';
import { ISearchRegistryItem, IGetContentItem, IGetContentRequest, ISearchRegistryItemRequest } from "./store/Interfaces";
import { Log } from "./utils/log";
import { Document, Page } from 'react-pdf/dist/umd/entry.webpack';
import Modal from './components/common/Modal';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Input from './components/common/inputs/Input';

function App() {

  // const inputProps = useInput("");

  // возвращаемые сервером данные
  const [docs, setDocs] = useState<ISearchRegistryItem[]>([])

  const [error, setError] = useState<String>("")

  const [file, setFile] = useState<String>("")

  const inputClientId = useInput("")


  const [searchRequest, setSearchRequest] = useState<ISearchRegistryItemRequest>()

  const [contentRequest, setContentRequest] = useState<IGetContentRequest>()

  const [isModal, setModal] = React.useState(false)
  const onClose = () => setModal(false)

  // const soapRes = useRef(null);
  function onClick(value: ISearchRegistryItemRequest) {
    // inputProps.onChange({target: {value: value}})
    console.log(value);
    if (value !== undefined) {
      setSearchRequest(value)
    }
  }

  function getAmdId(element: any) {

    setContentRequest({
      amdId: element.target.parentElement.parentElement.children[1].outerText
    })
    return false
  }

  function getSearchResponse(value: ISearchRegistryItem[]) {
    Log.d4("APP", "SearchResponse", value)
    setDocs(value)
  }

  function getContentResponse(value: IGetContentItem) {
    Log.d4("APP", "ContentResponse", {
      type: value.type
    })
    setFile(getFileURL(value.data.toString()))
    setModal(true)
  }

  function setErrorMessage(value: String) {
    setError(value)
    setTimeout(() => {
      setError("")
    }, 3000);
  }

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const base64toBlob = (data: string) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data;//substr('data:application/pdf;base64,'.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
  };

  function getFileURL(data: string) {
    const blob = base64toBlob(data);
    return URL.createObjectURL(blob);
  }

  return (

    <div className="App">

      <div className="justify-content-center">
        <Modal
          visible={isModal}
          title={contentRequest?.amdId.toString()}
          content={<div className="justify-content-center">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            {/* <p>Page {pageNumber} of {numPages}</p> */}
          </div>}
          footer={<button onClick={onClose}>Закрыть</button>}
          onClose={onClose}
        />
      </div>

      <Input 
      onChange={inputClientId.onChange}
      className="app-token float-right "
      placeholder="Введите clientId"/>

      <header className="App-header">
        <h3>{error}</h3>
      </header>


      
      <div className="App-search">
        <SearchPanel onClick={onClick} />
      </div>
      <div className="App-header">

        <DocumentTable docs={docs} onClick={getAmdId} />
        <SOAPResponse
          getSearchResponse={getSearchResponse}
          getContentResponse={getContentResponse}
          searchRequest={searchRequest}
          contentRequest={contentRequest}
          setError={setErrorMessage} 
          clientId={inputClientId.value}/>

      </div>
    </div >

  );

}

export default App;
