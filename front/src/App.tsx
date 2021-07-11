import logo from './logo.svg';
import './App.css';
import DocumentTable from './components/tables/Table';
import SOAPResponse from './components/soap/SOAPResponse';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useInput } from "./utils/hooks";
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import SearchPanel from './components/search/SearchPanel';
import { Document, Page } from 'react-pdf';

function App() {


  const [numPages, setNumPages] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages } : any) {
    setNumPages(numPages);
  }

  function onLoadError(error : any) {
    console.log(error)
  }

  

  // const inputProps = useInput("");

  // возвращаемые сервером данные
  const [docs, setDocs] = useState<String>()

  const [state, setState] = useState<String>()

  // const soapRes = useRef(null);
  function onClick(value: String) {
    // inputProps.onChange({target: {value: value}})
    console.log(value);
    if (value !== undefined) {
      setState(value.toString())
    }
  }

  function getResponse(value: any) {
    // inputProps.onChange({target: {value: value}})
    console.log("sdfsdfsd", value);
    setDocs(value.HelloResponse.Message)
  }

  return (
    // <div>
    //     <Document
    //       file="file:///D:/downloads/1.pdf"
    //       onLoadSuccess={onDocumentLoadSuccess}
    //       onLoadError={onLoadError}
    //     >
    //       <Page pageNumber={pageNumber} />
    //     </Document>
    //     <p>Page {pageNumber} of {numPages}</p>
    //   </div>
    <div className="App">
      
      <header className="App-header">



      </header>


      <div className="App-search">
        <SearchPanel onClick={onClick} />
      </div>
      <div className="App-header">



        <DocumentTable docs={docs} />
        <SOAPResponse getResponse={getResponse} state={state} />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </div>
    </div >

  );
}

export default App;
