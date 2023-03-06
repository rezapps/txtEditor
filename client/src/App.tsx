import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TxtEditor from './components/TxtEditor'
import Dashboard from './pages/Dashbord'


function App() {

	return (
		<Router>

			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/editor/:id' element={<TxtEditor />} />
			</Routes>

		</Router>
	)
}

export default App
