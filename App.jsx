import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context'; // ✅ add this
import store from './src/redux/store';
import Routes from './src/routes/Route';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider> {/* ✅ wrap this */}
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
