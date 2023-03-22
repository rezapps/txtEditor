import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


import TxtEditor from "../components/TxtEditor";
import MenuBar from "../components/MenuBar";

const Editor = () => {

	const [socket, setSocket] = useState<Socket | null>(null);
	const [contents, setContents] = useState('');
	const {id: doc_id} = useParams()
	const [title, setTitle] = useState<string>('')
	const autoSaveTime = 3000
	const [lastUpdated, setLastUpdated] = useState(Date.now());

	const [prnt, setPrnt] = useState<any>()

	const url = 'http://localhost:3000'

	useEffect(() => {

		const newSocket = io(`${url}`)

		setSocket(newSocket)

		return () => {
			newSocket.disconnect()
		}
	}, [])

	useEffect(() => {
		if (socket == null) return

		if (socket && contents)
		{

			const delta = {
				title: title,
				text: contents,
				id: doc_id
			}

			const interval = setInterval(() => {
				const elapsed = Date.now() - lastUpdated
				if ( elapsed <= 4000)
				{
					socket.emit('save-document', delta)
				}
			}, autoSaveTime)

			return () => {
				clearInterval(interval)
			}
		}


	}, [socket, contents, autoSaveTime, lastUpdated])

	useEffect(() => {
		if ( socket == null) return


		socket.once('load-doc', doc => {

			setContents(doc.text)
			setTitle(doc.title)

			setTimeout(() => {
				const qlTxt = document.getElementsByClassName("ql-editor");
				setPrnt(qlTxt[0].innerHTML)
				console.log(qlTxt[0].innerHTML)

			}, 200)
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


	useEffect(() => {
		if ( socket == null) return

		const syncTitle = (delta:any) => {
			console.log('text: ', delta.title)
			setTitle(delta)
		}
		socket.on('receive-title', syncTitle)
	}, [socket])


	const handleChange = (html: any, delta: any, source: any, editor: any) => {

		const txtDelta = editor.getContents()

		setContents(txtDelta);
		if (source !== 'user') return

		if (socket && source == 'user') {
			socket.emit('send-delta', txtDelta)
			console.log('from editor: ', txtDelta)
			setLastUpdated(Date.now());
		}
	};

	const handleTitleChange = (title: string) => {
		const docTitle = title

		setTitle(docTitle)

		if (socket) {
			socket.emit('send-title', docTitle)
			setLastUpdated(Date.now());
		}

	}

	const saveDoc = () => {

	}
	const delDoc = () => {

	}

	const mailDoc = () => {

	}

	return(
		<>
			<div className='navbar'>
				<MenuBar
					title={title}
					handleTitleChange={handleTitleChange}
					saveDoc={saveDoc}
					delDoc={delDoc}
					mailDoc={mailDoc}
					prnt={prnt}
				/>
			</div>
			<TxtEditor handleChange ={handleChange} contents={contents}/>
		</>
	);
}


export default Editor;
