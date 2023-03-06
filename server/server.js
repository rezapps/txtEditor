require('dotenv').config();
const app = require('express')();
const server = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const Doc = require('./models/Docmnt');
const docRoutes = require('./routes/route');

const httpServer = require('http').createServer(app);
app.use(cors());

app.use('/api/docs', docRoutes);

mongoose.connect(process.env.MONGO_URI);

const FRONT_URL = process.env.FRONT_URL

const io = server(httpServer, {
	cors: {
		origin: `${FRONT_URL}`,
		methods: ["GET", "POST"]
	}
});

io.on("connection", socket => {
	socket.on('getDoc', async doc_id => {
		const currDoc = await findOrCreate(doc_id);
		socket.join(doc_id);

		socket.emit('load-doc', currDoc)

		socket.on('send-delta', delta => {
			console.log(delta);

			socket.broadcast.to(doc_id).emit('receive-delta', delta);
		});

		socket.on('save-document', async data => {
			await Doc.findByIdAndUpdate(doc_id, { data });
		});
	});

	console.log('connected!! ');

	socket.on("disconnect", (reason) => {
		console.log('disconnected ', socket.id, ' due to ', reason);
	});
});

async function findOrCreate(id) {
	if (id == null) return;

	const doc = await Doc.findById(id);
	console.log(doc)

	if (doc) return doc;
	const newDoc = await Doc.create({ _id: id, title: 'untitled', text: '<p>type here...</p>' });
	console.log(newDoc)
	return newDoc
}

httpServer.listen(3000, () => {
	console.log('Server is listening on port 3000');
});
