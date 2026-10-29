import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux-state/CartState';
import { ChakraProvider } from '@chakra-ui/react';

test('renders App without crashing', () => {
  render(
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  );
});

