const server = require('socket.io')

const io = server( 3000, {
	cors: {
		origin: "http://127.0.0.1:5173",
		methods: ["GET", "POST"]
	}
})

io.on("connection", socket=> {
	socket.on('send-delta', delta => {
		console.log(delta)

		socket.broadcast.emit('receive-delta', delta)
	})	

	socket.on("disconnect", (reason) => {
		console.log('disconnected ', socket.id, ' due to ', reason)
	})
})
