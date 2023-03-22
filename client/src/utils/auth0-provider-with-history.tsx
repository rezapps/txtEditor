import { useNavigate } from "react-router-dom";
import { Auth0Provider, AppState, User } from "@auth0/auth0-react";

interface Auth0ProviderWithHistoryProps {
	children: React.ReactNode;
}

const Auth0ProviderWithHistory = ({ children }: Auth0ProviderWithHistoryProps) => {
	const navigate = useNavigate();
	//   const domain = process.env.REACT_APP_AUTH0_DOMAIN;
	//   const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || '';

	const domain = 'rezapps.eu.auth0.com'
	const clientId = 'BvIZxunEc2pEwvxmcbL0nrSukY6nq035'
	const onRedirectCallback = (appState: AppState | undefined, user: User | undefined) => {
		navigate(appState?.returnTo || window.location.pathname);
	};

	return (
		<Auth0Provider
			domain={domain || ''}
			clientId={clientId}
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Provider>
	);
};

export default Auth0ProviderWithHistory;
