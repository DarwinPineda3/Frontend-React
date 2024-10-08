// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './store/Store';
import Spinner from './views/spinner/Spinner';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './_mockApis';


import { AuthProvider } from 'src/guards/jwt/JwtContext'; 

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  
  <I18nextProvider i18n={i18n}>
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  </Provider>
  </I18nextProvider>
);
