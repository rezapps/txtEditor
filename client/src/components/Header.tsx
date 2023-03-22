import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {


	const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
	// const { picture } = user

	return (
		<header className="header">
			<div className="logo">
				<Link to="/">TxtEditor</Link>
			</div>


			{!isAuthenticated ?
				(<ul className="nav">
					<li
						onClick={() => loginWithRedirect}
					>
						Login
					</li>
					<li>
						<Link to="/signup"
							onClick={() =>
								loginWithRedirect({
							})}
						>
							Register
							</Link>
					</li>
				</ul>) :
				(
					<ul className="nav">
						<li
							onClick={() => logout({returnTo: window.location.origin})}
						>
							Logout
						</li>
					</ul>
				)
			}


		</header>
	)
}
export default Header;
