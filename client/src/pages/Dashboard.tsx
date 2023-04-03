import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { v4 as uuidv4 } from 'uuid';
import { DOC } from '../DOC';

import Header from '../components/Header';

function useDocs() {

	const navigate = useNavigate();
	const cre8Doc = `${uuidv4()}`;
	const url = `${import.meta.env.VITE_API_URL}/api/docs`;
	const [docs, setDocs] = useState<DOC[]>([]);

	function sendToEditor(doc: any) {
		navigate(`/editor/${doc._id}`);
	}

	const authHeader = useAuthHeader();

	useEffect(() => {

		async function fetchDocs() {

			try {

				const auth = await authHeader()

				console.log('url:', url);
				console.log('auth:', auth);
				const res = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `${auth}`
					}
				});

				if (res.status === 200) {
					const data = await res.json();
					if (data) {
						setDocs([
							{
								_id: cre8Doc,
								title: 'Create New',
								text: 'Type here...',
								author: '',
								createdAt: '',
								updatedAt: ''
							},
							...data
						]);
						console.log(data);
					}
				} else {
					throw new Error('Something went wrong on api server!');
				}
			} catch (error) {
				console.log(error);
			}
		}

		fetchDocs();
	}, [navigate, url]);

	return { docs, sendToEditor };
}

const Dashboard = () => {
	const { docs, sendToEditor } = useDocs();

	return (
		<>
			<Header />
			<div className='docsList'>
				<div className='docInfo docTbl'>
					<span className='docTitle'>Title</span>
					<span className='docUpd8'>Last opened at:</span>
					<span className='docUser'>Created by:</span>
				</div>

				{docs &&
					docs.map((doc) => (
						<div
							className='docInfo'
							key={doc._id}
							onClick={() => sendToEditor(doc)}
						>
							<span className='docTitle'>{doc.title}</span>
							<span className='docUpd8'>
								{doc.updatedAt.replace('T', '  At:  ').slice(0, 22)}
							</span>
							<span className='docUser'>User x</span>
						</div>
					))}
			</div>
		</>
	);
};

export default Dashboard;
