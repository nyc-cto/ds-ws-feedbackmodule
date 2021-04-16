import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const WidgetDivs = document.querySelectorAll('#feedback-widget')
WidgetDivs.forEach(Div => {
  ReactDOM.render(
    <React.StrictMode>
      <App domElement={Div} />
    </React.StrictMode>,
    Div
  );
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals