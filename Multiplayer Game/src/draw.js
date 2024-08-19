function Draw(playerList, cristal){
	//Draw players in Canvas
	const canvas = document.querySelector('#canvas')
	if(canvas.getContext){
		canvas.width = 600
		canvas.height = 600
		const ctx = canvas.getContext('2d')
		ctx.clearRect(0, 0, 600, 600)

		Object.keys(playerList).forEach((player) =>{
			//players
			let X = playerList[player].x
			let Y = playerList[player].y
			let color = playerList[player].color

			ctx.beginPath()
			ctx.fillStyle = color
			ctx.fillRect(X, Y, 30, 30)
			ctx.fill()
		})
		ctx.beginPath()
		ctx.fillStyle = cristal.color
		ctx.fillRect(cristal.x, cristal.y, 15, 15)
		ctx.fill()
	}
	//Write players in HTML
	const UL = document.querySelector('#players')
	while(UL.hasChildNodes()){
		UL.removeChild(UL.lastChild)
	}
	Object.keys(playerList).forEach((player) =>{
		let LI = document.createElement('li')
		LI.innerText = `${player} - ${playerList[player].points}`
		UL.append(LI)
	})

}
