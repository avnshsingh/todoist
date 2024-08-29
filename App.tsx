import MainNavigator from './src/navigation/MainNavigator';
import Toast from 'react-native-toast-message';

function App(): JSX.Element {
  return (
    <>
      <MainNavigator />
      <Toast />
    </>
  );
}

export default App;
