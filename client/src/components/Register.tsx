import { useState } from 'react'
import axios from 'axios'

interface SignupResponse {
	message: string
}


interface IFormInput {
	firstName: String;
	gender: String;
}

const Register = (): JSX.Element => {

	const [regUserMail, setRegUserMail] = useState("")
	const [regUserName, setRegUserName] = useState("")
	const [regUserPass, setRegUserPass] = useState("")
	const [confirmUserPass, setConfirmUserPass] = useState("")
	const [warnUser, setWarnUser] = useState("")
	const url = import.meta.env.VITE_API_URL


	const registerUser = (e: any) => {
		e.preventDefault()
		setWarnUser('')

		if (confirmUserPass === regUserPass) {
			axios.post<SignupResponse>(`${url}/user/signup`, {
				usermail: regUserMail,
				username: regUserName,
				userpass: regUserPass,
			}, { withCredentials: true })
				.then((res) => {
					if (res.status === 201) {
						console.log(res)
						localStorage.setItem('user', JSON.stringify(res))
						setWarnUser('')
						setWarnUser('User succesfully created!')
					} else if (res.status === 406) {
						setWarnUser('')
						setWarnUser('This email is already registered to another user!')
					}
				})
				.catch((error: Error) => {
					console.error(error)
				})
		} else {
			setWarnUser('')
			setWarnUser('pass does not match!')
		}
	}

	return (
		<form className='reg-form'>
			<fieldset className='fieldset'>
				<label htmlFor="regmail">Email</label>
				<input
					id="regmail"
					type="email"
					pattern= "/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/"
					onChange={e => setRegUserMail(e.target.value)}
				/>
			</fieldset>
			<fieldset className='fieldset'>
				<label htmlFor="regusername">User Name</label>
				<input
					id="regusername"
					type="text"
					onChange={e => setRegUserName(e.target.value)}
				/>
			</fieldset>
			<fieldset className='fieldset'>
				<label htmlFor="regpass">Password</label>
				<input
					id="regpass"
					type="password"
					onChange={e => setRegUserPass(e.target.value)}
				/>
			</fieldset>
			<fieldset className='fieldset'>
				<label htmlFor="regconfirm">Confirm Password</label>
				<input
					id="regconfirm"
					type="password"
					onChange={e => setConfirmUserPass(e.target.value)}
				/>
			</fieldset>
			{warnUser.length > 0 ? <p style={{ color: "red" }}>{warnUser}</p> : ''}

			<button
				className="btn"
				type="submit"
				onClick={registerUser}
			>Register</button>
		</form>
	)

}

export default Register
