import { Link, useNavigate } from "react-router-dom";

const Header = () => {
	return (
		<header className="header">
			<div className="logo">
				<Link to="/">TxtEditor</Link>
			</div>
			<ul className="nav">
				<li>Logout</li>
				<li>Login</li>
				<li>
					<Link to="/signup">Register</Link>
				</li>
			</ul>
		</header>
	)
}
export default Header;
