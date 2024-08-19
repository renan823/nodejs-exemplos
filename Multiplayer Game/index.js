//Imports
const express = require("express")
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path');

//Static documents
app.use("/src/", express.static("src"))

//Variables
var playerList = {}
var colors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'lightblue', 'gray', 'pink', 'lightgreen']
var connections = 0
var colisao = false
var cristal = {
	x: Math.floor(Math.random() * 500),
	y: Math.floor(Math.random() * 580),
  color: 'gold',
}

//Possible Moves
const Moves = {
	ArrowUp(socket){
		colisao = false
		if((playerList[socket].y) > 0){
			playerList[socket].y-=10
			colisao = Colidir(playerList[socket].x, playerList[socket].y, 30, cristal.x, cristal.y, 15, colisao)
		}
		else{
			playerList[socket].y+= 600 - 20
		}
	},
	ArrowDown(socket){
		colisao = false
		if((playerList[socket].y) < 570){
			playerList[socket].y+=10
			colisao = Colidir(playerList[socket].x, playerList[socket].y, 30, cristal.x, cristal.y, 15, colisao)
		}
		else{
			playerList[socket].y-= 600
		}
	},
	ArrowRight(socket){
		colisao = false
		if((playerList[socket].x) < 570){
			playerList[socket].x+= 10
			colisao = Colidir(playerList[socket].x, playerList[socket].y, 30, cristal.x, cristal.y, 15, colisao)
		}
		else{
			playerList[socket].x-= 600
		}
	},
	ArrowLeft(socket){
		colisao = false
		if((playerList[socket].x) > 0){
			playerList[socket].x-=10
			colisao = Colidir(playerList[socket].x, playerList[socket].y, 30, cristal.x, cristal.y, 15, colisao)
		}
		else{
			playerList[socket].x+= 600 - 20
		}
	}
}

//Send HTML file
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'src/index.html'));
})

//Colision detection
function Colidir(x1, y1, t1, x2, y2, t2, colisao){
  colisao = false

  if(x1 < x2 + t2 && x1 + t1 > x2 && y1 < y2 + t2 && y1 + t1 > y2){
    colisao = true
    cristal.x =  Math.floor(Math.random() * 580)
		cristal.y =  Math.floor(Math.random() * 580)
  }
  return(colisao)
}

//Receive the socket connection
io.on('connection', (socket)=>{
    if(connections < 10){
    	connections++
    	let colorIndex = Math.floor(Math.random()*colors.length)
    	playerList[String(socket.id)] = {
    		x: Math.floor(Math.random() * 580),
    		y: Math.floor(Math.random() * 580),
    		color: colors[colorIndex],
    		points: 0,
    	}
    	colors.splice(colorIndex, 1)
    	io.emit('on', playerList, cristal)
    }

    //Receive desconnection
    socket.on('disconnect', ()=>{
    	colors.push(playerList[String(socket.id)].color)
    	delete playerList[String(socket.id)]
    	connections--
    	io.emit('off', playerList, cristal)
    })

    //Receive moves
    socket.on('move', (key, socket)=>{
    	let Mover = Moves[key]
    	if(Mover = Moves[key]){
    		Mover(socket)
    		if(colisao){
					playerList[socket].points++
				}
    		io.emit('atualize', playerList, cristal)
    	}
    })
})
const PORT = process.env.PORT || 3000
//Open the server on port 3000
http.listen(PORT, ()=>{
	console.log("Running!")
})
