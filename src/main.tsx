// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { I18nextProvider } from 'react-i18next';
import './_mockApis';
import App from './App';
import i18n from './i18n';
import { store } from './store/Store';
import './utils/extensions';
import Spinner from './views/spinner/Spinner';


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
