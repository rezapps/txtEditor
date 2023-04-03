import { useState } from 'react';
import axios, { AxiosResponse } from 'axios'
import { useForm } from "react-hook-form";
import { useSignIn } from 'react-auth-kit';


type FormData = {
	usermail: string;
	userpass: string;
};


const Login = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
	const [warnUser, setWarnUser] = useState('')
	const signIn = useSignIn()
	const url = import.meta.env.VITE_API_URL



	const handleLogin = async (data: any) => {
		try {
			const res = await axios.post(
				`${url}/user/signin`,
				data
			)
			if (res.status === 200) {
				signIn({
					token: res.data,
					expiresIn: 7200,
					tokenType: 'Bearer',
					authState: {
						usermail: data.usermail
					}
				})
			} else {
				setWarnUser('Password or Email is incorrect')
				return;
			}


		} catch (error) {
			console.log(error)
		}

	}


	return (
		<form onSubmit={handleSubmit(data => handleLogin(data))}>
			<label>Email</label>
			<input
				type="text"
				{...register("usermail", {
					required: true,
					pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				})}
			/>
			<label>Password</label>
			<input
				type="password"
				{...register("userpass", {
					required: true, minLength: 6
				})}
				placeholder="Password"
			/>

			<input type="submit" />
		</form>
	);

}


export default Login
