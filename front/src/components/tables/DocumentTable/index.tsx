import React, { useEffect, useState, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { ISearchRegistryItem, IGetContentItem, ISearchRegistryItemData } from "../../../store/Interfaces";

const DocumentTable: React.FunctionComponent<ISearchRegistryItemData> = (props) => {

  const {
    docs,
    onClick
  } = props


  let count: number = 0;

  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>amdId</th>
            <th>localUid</th>
            <th>registrationDate</th>
          </tr>
        </thead>
        <tbody>
          {
            docs.map((item: ISearchRegistryItem) => {
              count += 1
              return (
                <tr>
                    <td>{count}</td>
                    <td>{item.amdId}</td>
                    <td>{item.localUid}</td>
                    <td>{item.registrationDate}</td>
                    <td><Button type="button" className='btn-light' onClick={onClick}>Просмотр</Button></td>
                </tr>
              )
            }
            )
          }
        </tbody>
      </Table>
    </div>
  )
}

export default DocumentTable;