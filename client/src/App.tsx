import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RequireAuth } from 'react-auth-kit'
import Editor from './pages/Editor'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'



function App() {

	return (
		<Router>
			<div className="container">
				<Routes>
					<Route path='/'
						element={
							<RequireAuth loginPath='/login'>
								<Dashboard />
							</RequireAuth>
						}
					/>
					<Route path='/editor/:id'
						element={
							<RequireAuth loginPath='/login'>
								<Editor />
							</RequireAuth>
						}
					/>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignupPage />} />
				</Routes>
			</div>

		</Router>
	)
}

export default App
