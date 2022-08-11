
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import combinedReducer from '../redux/redusers';
import MuviesLoadData from './MuviesLoadData';

const store=createStore(combinedReducer);

class MainPage extends React.PureComponent {

  render() {

    return (
      <Provider store={store}>
          <div>
              <h1>Фильминфо</h1>
              <MuviesLoadData/>
          </div>
      </Provider>
    );

  }

}

export default MainPage;
