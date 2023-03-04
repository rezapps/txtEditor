import { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import { io, Socket } from 'socket.io-client'

import 'react-quill/dist/quill.snow.css';

export default function TxtEditor() {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [text, setText] = useState('');




	useEffect(() => {
		const newSocket = io("http://localhost:3000")

		setSocket(newSocket)

		return () => {
			newSocket.disconnect()
		}
	}, [])


	// useEffect(() => {
	// 	if ( socket == null || text == null ) return
	// 	const syncEditor = (delta) {

	// 	}
	// })


	const handleChange = (html: any, delta: any, source: any, editor: any) => {
		setText(html);

		if (socket && source == 'user') {
			socket.emit('send-delta', delta)

			// console.log('delta ops: ', delta.ops)
			console.log('editor: ', editor)
		}

	};

	const modules = {
		toolbar: [
			[{ 'header': [1, 2, 3, 4, false] }],
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
