import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Route';
import { TailwindProvider } from 'nativewind'; // Import NativeWind provider
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider>  {/* Wrap NavigationContainer with TailwindProvider */}
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </TailwindProvider>
    </Provider>
  );
}
