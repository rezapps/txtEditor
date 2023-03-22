import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function MenuBar({ ...props }) {

	const navigate = useNavigate();
	const new_id = `${uuidv4()}`;

	const handleOptions = (v: string) => {
		const ttl:any = `<h1>${props.title}</h1>`

		const prntWindow: any = window.open(
			"",
			"prntWindow",
			"status=1,width=700,height=650"
		);

		const slct:any = document.getElementById("slct");
		if (slct) {
			slct.selectedIndex = 0;
		}

		switch (v) {
			case 'new':
				navigate(`/editor/${new_id}`);
				console.log(`/editor/${new_id}`)
			case 'save':

			case 'print':
				const prntWindow = window.open(
					"",
					"prntWindow",
					"status=1,width=700,height=650"
				);
				if (prntWindow) {
					prntWindow.document.write(`
						<html>
							<head>
								<title>${props.title}</title>
								<style>
									img {
										display: block;
										max-width: 210mm;
										max-height: 297mm;
										width: auto;
										height: auto;
									}
									@page {
										margin: 1in;
										size: 21cm 29cm;
										margin: 2.5cm 2cm;
									}
									@media print {
										table {
											page-break-inside: avoid;
										}
										a[href]:after {
											content: " (" attr(href) ")";
											font-size: 90%;
											color: #333;
										}
									}
								</style>
							</head>
							<body>
					${ttl + props.prnt}`);
					prntWindow.onbeforeprint = () => {
						prntWindow.history.replaceState({}, "", `./${props.title}`);
					}
					prntWindow.document.write('<body onafterprint="self.close()">');
					prntWindow.document.write(`</body></html>`)
					prntWindow.print();


				}

			// case 'dnlod':

			// case 'delete':

			// case 'email':



		}
	}

	return (
		<div className='menuBar'>
			<img className="logo" src="/src/assets/txtedit.png" />

			<div className="input-select">
				<input
					type='text'
					value={props.title}
					onChange={(e) => props.handleTitleChange(e.target.value)}
					required
				/>
				<select id="slct" onChange={(e) => handleOptions(e.target.value)}>
					<option value="" defaultValue={''}>File</option>
					<option style={{ 'fontFamily': 'icomoon' }} value="new">&#xe926;   New</option>
					<option style={{ 'fontFamily': 'icomoon' }} value="save">&#xe962;   Save</option>
					<option style={{ 'fontFamily': 'icomoon' }} value="print">&#xe954;   Print</option>
					<option style={{ 'fontFamily': 'icomoon' }} value="dnlod">&#xe9c7;    Download</option>
					<option style={{ 'fontFamily': 'icomoon' }} value="delete">&#xe9ac;    Delete</option>
					<option style={{ 'fontFamily': 'icomoon' }} value="email">&#xe903;   Email</option>
				</select>
			</div>
		</div>
	);
}

export default MenuBar;
