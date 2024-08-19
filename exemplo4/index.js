const express = require("express")
const app = express()
const path = require("path")


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/data", (req, res)=>{
  res.send(path.join(__dirname, "/data.json"))
})
app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "/index.html"))
})
app.post("/", (req, res)=>{
  res.send({status: "Ok"})
})

const PORT = 8081
app.listen(PORT, ()=>{
  console.log("Ready!")
})
