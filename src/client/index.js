import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (!window.location.search) {
  window.location.search = '?incident=F01705150090';
}

ReactDOM.render(<App />, document.getElementById('app-container'));
