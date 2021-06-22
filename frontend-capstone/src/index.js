import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import './styles.scss';

var mountNode = document.getElementById('app');
ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  mountNode
);
