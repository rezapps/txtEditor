import { useState, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import { io, Socket } from 'socket.io-client'
import { useParams } from 'react-router-dom';

import 'react-quill/dist/quill.snow.css';

export default function TxtEditor() {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [contents, setContents] = useState('');
	const {id: doc_id} = useParams()


	const url = 'http://localhost:3000'

	useEffect(() => {

		const newSocket = io(`${url}`)

		setSocket(newSocket)

		return () => {
			newSocket.disconnect()
		}
	}, [])

	useEffect(() => {
		if ( socket == null) return

		socket.once('load-doc', doc => {
			setContents(doc.text)
		})

		socket?.emit('getDoc', doc_id)
	}, [socket, doc_id])


	useEffect(() => {
		if ( socket == null) return

		const syncEditor = (delta:any) => {
			console.log('text: ', delta.text)
			setContents(delta)
		}
		socket.on('receive-delta', syncEditor)
	}, [socket])


	const handleChange = (html: any, delta: any, source: any, editor: any) => {

		const txtDelta = editor.getContents()
		setContents(txtDelta);
		if (source !== 'user') return

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
