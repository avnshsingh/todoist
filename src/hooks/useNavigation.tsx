import {
  useNavigation as useNativeNavigation,
  NavigationProp,
} from '@react-navigation/native';

import {RootStackParamList} from '../navigation/MainNavigator';

type AppNavigationProp = NavigationProp<RootStackParamList>;

// a type alias hook for the useNavigation hook
const useNavigation = () => useNativeNavigation<AppNavigationProp>();

export default useNavigation;
