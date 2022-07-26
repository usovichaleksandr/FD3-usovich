import React from 'react';
import ReactDOM from 'react-dom';

import Filter from './components/Filter';

let massWords=['california', 'everything', 'aboveboard', 'washington',
'basketball', 'weathering', 'characters', 'literature', 'contraband', 'appreciate'];

ReactDOM.render(
  <Filter massWords={massWords}/>
  , document.getElementById('container') 
);

