import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// function Df() {
//   return (
//     <List<number>
//     items={[1,2,3,4]} 
//     renderItem={item => <li key={item}>{item.toPrecision(3)}</li>}
//   />
//   )
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// interface Props<T> {
//   items: T[];
//   renderItem: (item: T) => React.ReactNode;
// }

// function List<T>(props: Props<T>) {
//   const { items, renderItem } = props;
//   const [state, setState] = React.useState<T[]>([]); 
  
//   return (
//     <div>
//       {items.map(renderItem)}
//     </div>
//   );
// }

// ReactDOM.render(
//   <List<number>
//     items={[1,2,3,4]} 
//     renderItem={item => <li key={item}>{item.toPrecision(3)}</li>}
//   />,
//   document.body
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
