import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { ISOAPResponse } from "../../../store/Interfaces"
import { AppService } from "../../../services/AppService"
import {ISearchRegistryItem, IGetContentItem, IGetContentRequest, ISearchRegistryItemRequest} from "../../../store/Interfaces";

const SOAPResponse: React.FunctionComponent<ISOAPResponse> = (props) => {

  const {
    searchRequest,
    contentRequest,
    getSearchResponse,
    getContentResponse,
    setError,
    clientId
  } = props;


  async function searchRegistryItem(body: ISearchRegistryItemRequest | undefined) {

    // let str : String = name ?? ""
    if (body !== undefined) {
      let data = await AppService.searchRegistryItem({
        page: '1',
        clientEntityId: clientId,
        surname: body.surname,
        name: body.name,
        patrname: body.patrname,
        birthdate: body.birthdate
      })

      if (data)
        getSearchResponse(data)
      else {
        setError("Ошибка поиска документов")
      }
      // setMEs(await AppService.getDocument({name: name}));
    }
    
  }

  async function getContent(body: IGetContentRequest | undefined) {

    if (body !== undefined) {
      let data = await AppService.getContent({
        amdId: body.amdId,
        clientEntityId: clientId
      })
      
      if (data)
      getContentResponse(data)
      else {
        setError("Ошибка вывода документа")
      }
    }
    
  }

  useMemo(() => searchRegistryItem(searchRequest), [searchRequest]);
  useMemo(() => getContent(contentRequest), [contentRequest]);

  return (
    <div>
    </div>  
  );
};

export default SOAPResponse;