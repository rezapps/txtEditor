import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

type Doc = {
	_id: string;
	title: string;
	text: Object;
	updatedAt: string
}

const Dashboard = () => {


	const cre8Doc = `${uuidv4()}`;

    const url = 'http://localhost:3000/api/docs';

	const [docs, setDocs] = useState<Doc[]>([]);
	const navigate = useNavigate();

	function sendToEditor(doc:any) {
		localStorage.setItem('currentDoc', JSON.stringify(doc));
		navigate(`/editor/${doc._id}`);
	}

	useEffect(() => {

		const dox = async () => {
			const res = await fetch(`${url}`);
			const data  = await res.json()

			if (data) {
				setDocs([{
					_id: cre8Doc,
					title:'Create New',
					text:'Type here...',
					createdAt:'',
					updatedAt:''
				}, ...data])
				console.log(data)
			}
		}

		dox()

	}, [])


	return (
		<div className='docsList'>
			<div className='docInfo docTbl' >
				<span className="docTitle">Title</span>
				<span className="docUpd8">Last opened at:</span>
				<span className="docUser">Created by:</span>
			</div>

			{ docs && docs.map(
				(doc) => (
					<div className='docInfo' key={doc._id} onClick={() => sendToEditor(doc)}>
						<span className="docTitle">{doc.title}</span>
						<span className='docUpd8'>{doc.updatedAt.replace('T', '  At:  ').slice(0,22)}</span>
						<span className='docUser'>User x</span>
					</div>
				))
			}
		</div>
	)
}

export default Dashboard
