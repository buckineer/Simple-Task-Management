import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { SnackbarProvider } from 'notistack';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <SnackbarProvider
      preventDuplicate
      autoHideDuration={2000}
      dense
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
