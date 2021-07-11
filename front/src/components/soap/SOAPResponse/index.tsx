import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { ISOAPResponse, ISOAPData } from "../../../store/Interfaces"
import { AppService } from "../../../services/AppService"

const SOAPResponse: React.FunctionComponent<ISOAPResponse> = (props) => {

  const {
    state,
    getResponse
  } = props;

  const [mess, setMEs] = useState<ISOAPData>({
    "HelloResponse": {
      "Message": "123456"
    }
  });

  async function load(name: String | undefined) {

    // let str : String = name ?? ""
    if (name !== undefined) {
      getResponse(await AppService.getDocument({name: name}))
      // setMEs(await AppService.getDocument({name: name}));
    }
    
  }

  // const updateData = (value: any) => {
  //   setMEs({
  //     "HelloResponse": {
  //       "Message": value,
  //     }
  //   })
  // }

  useEffect(() => {
    document.title = mess.HelloResponse.Message.toString()
  });

  function onClick(e: any) {
    load("222")
    e.preventDefault();
    // console.log('Пользователь был удален.');
  }

  // const memoizedCallback = useCallback(
  //   () => {

  //     load(state);
  //   },
  //   [state],
  // );
  
  // const inputEl = useRef(null);

  const memoizedValue = useMemo(() => load(state), [state]);

  return (
    <div>
    {/* <h1>{JSON.stringify(mess)}</h1>
    <h1>{state}</h1>
    {/* <h1>{JSON.stringify(memoizedCallback)}</h1> 
    <button onClick={onClick}>222</button>
    <button onClick={() => load("333")}>333</button> */}
    </div>  
  );
};

export default SOAPResponse;