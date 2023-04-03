import React from 'react';
import ReactDOM from 'react-dom/client'
import './styles/styles.css';
import App from './App';
import { AuthProvider } from 'react-auth-kit';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<AuthProvider
			authType={'cookie'}
			authName={'_auth'}
			cookieDomain={window.location.hostname}
			cookieSecure={false} // change to true if https
		>
			<App />
		</AuthProvider>
	</React.StrictMode>
);
