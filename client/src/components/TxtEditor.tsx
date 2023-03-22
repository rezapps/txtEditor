import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TxtEditor = ({ ...props }) => {
	const modules = {
		toolbar: [
			[{ 'header': [1, 2, 3, 4, false] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
			['link', 'image'],
			['clean']
		]
	}

	return (
		<ReactQuill
			theme="snow"
			modules={modules}
			value={props.contents}
			onChange={props.handleChange}
		/>

	);
}

export default TxtEditor;
