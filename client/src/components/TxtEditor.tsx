import { useState, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import { io, Socket } from 'socket.io-client'

import 'react-quill/dist/quill.snow.css';

export default function TxtEditor() {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [contents, setContents] = useState('');




	useEffect(() => {
		const newSocket = io("http://localhost:3000")

		setSocket(newSocket)

		return () => {
			newSocket.disconnect()
		}
	}, [])


	useEffect(() => {
		if ( socket == null) return

		const syncEditor = (delta:any) => {
			setContents(delta)
		}

		socket.on('receive-delta', syncEditor)


	}, [socket])


	const handleChange = (html: any, delta: any, source: any, editor: any) => {

		const txtDelta = editor.getContents()
		setContents(txtDelta);
		console.log('editor get contents: ', txtDelta)

		if (socket && source == 'user') {
			socket.emit('send-delta', txtDelta)

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
		value={contents}
		onChange={handleChange}
	/>;
}
