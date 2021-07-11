import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

interface IDocument {
  docs: String | undefined
}

const DocumentTable: React.FunctionComponent<IDocument> = (props) => {

  const {
    docs
  } = props
  const initItems = [
    [1, 'АВ000' + 1, 'История болезни', "Иванов Иван Иванович", "12.02.1992"],
  ];
  const [items, setItems] = useState<any>(initItems);
  const [count, setCount] = useState<any>(1);

  function increaseRow() {
    setCount(count + 1)
    let data = [...items, [count + 1, 'АВ000' + (count + 1), docs, "Иванов Иван Иванович", "12.02.1992"]]
    setItems(data)
  }
  return (
    <div>
      <button onClick={increaseRow}>increaseRow</button>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Номер документа</th>
            <th>Название</th>
            <th>ФИО пациента</th>
            <th>Дата рождения</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map((item: any) =>
              <tr>
                {
                  item.map((el: any) =>
                    <td>{el}</td>
                  )
                }
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  )
}

export default DocumentTable; 