import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Editor from './pages/Editor'
import Dashboard from './pages/Dashboard'



function App() {

	return (
		<Router>
			<div className="container">
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/editor/:id' element={<Editor />} />
				</Routes>
			</div>

		</Router>
	)
}

export default App
