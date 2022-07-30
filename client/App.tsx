import { StatusBar } from 'expo-status-bar';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

import AppNavigation from '@/Navigation/AppNavigation';

function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <AppNavigation />
    </Provider>
  );
}

export default App;
