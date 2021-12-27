// theme.js
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  styles: {
    global: {
      // global style redefinition
      ':host,:root': {
        '--chakra-ui-focus-ring-color': '#ff007d99'
      },
      'html, body': {
        color: 'gray.900',
        backgroundColor: 'gray.100',
        lineHeight: 'tall'
      },
      html: {
        scrollBehavior: 'smooth'
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }
    }
  },
  colors: {
    lime: {
      50: '#f2ffde',
      100: '#defcb2',
      200: '#caf884',
      300: '#b5f554',
      400: '#a1f226',
      500: '#88d90d',
      600: '#69a905',
      700: '#4a7801',
      800: '#2b4800',
      900: '#0b1900'
    }
  },
  fonts: {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  },
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: 'green.500'
      }
    },
    Button: {
      baseStyle: {
        _focus: {
          boxShadow:
            '0 0 2px 2px rgba(56, 161, 105, .55), 0 1px 1px rgba(0, 0, 0, .15)'
        }
      }
    }
  }
});

export default customTheme;
