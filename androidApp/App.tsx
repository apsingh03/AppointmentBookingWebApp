// import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';

import {store} from './src/redux/Store';
import {Provider} from 'react-redux';

import AppNavigator from './src/AppNavigator';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
