import { Link, useNavigate } from "react-router-dom";
import { useIsAuthenticated } from 'react-auth-kit';
import { useSignOut } from 'react-auth-kit'

const Logout = () => {
	const signOut = useSignOut()

	return (
		<a onClick={() => signOut()} >Logout</a>
	)
}


const Header = () => {

	const isAuthenticated = useIsAuthenticated()

	return (
		<header className="header">
			<div>
				<Link to="/"><img className="logo" src="/src/assets/txtedit.png" /></Link>
			</div>
				<Link to="/signup">Register</Link>

				{isAuthenticated() &&
					<Logout />
				}

		</header>
	)
}
export default Header;
