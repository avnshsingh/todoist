import Toast from 'react-native-toast-message';

const useToast = () => {
  const successMessage = (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
    });
  };
  const errorMessage = (message: string) => {
    Toast.show({
      type: 'error',
      text1: message,
    });
  };
  const warnMessage = (message: string) => {
    Toast.show({
      type: 'info',
      text1: message,
    });
  };
  return {
    successMessage,
    errorMessage,
    warnMessage,
  };
};

export default useToast;
