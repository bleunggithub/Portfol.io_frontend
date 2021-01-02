import React from 'react';
import ReactDOM from 'react-dom';

//redux
import store from './store'
import { Provider } from 'react-redux';

//CSS, UI
import './index.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

//Pages, Components
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

//define theme primary & secondary colours
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#546e7a",
      light: "#819ca9",
      dark: "#29434e",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f5f5f5",
      light: "#90a4ae",
      dark: "#62757f",
      contrastText: "#000000",
    },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

serviceWorkerRegistration.unregister();
// serviceWorkerRegistration.register();

