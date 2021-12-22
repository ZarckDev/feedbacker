import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@lib/auth';

import customTheme from '@styles/theme';

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme} resetCSS="true">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
