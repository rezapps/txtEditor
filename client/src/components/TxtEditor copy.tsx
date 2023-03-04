import { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import { io } from 'socket.io-client'

import 'react-quill/dist/quill.snow.css';

export default function TxtEditor() {
	useEffect(() => {
		const socket = io("http://localhost:3000")

		return () => {
			socket.disconnect()
		}
	}, [])


	const [text, setText] = useState('');
	const handleChange = (value: string) => {
		setText(value);
	};

	const modules = {
		toolbar: [
			[{ 'header': [1, 2, false] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
			['link', 'image'],
			['clean']
		]
	}

	return <
		ReactQuill theme="snow"
		modules={modules}
		value={text}
		onChange={handleChange}
	/>;
}
