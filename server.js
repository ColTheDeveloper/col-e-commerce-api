import http from "http"
import app from "./app/app.js"


const server=http.createServer(app)

server.listen(2500,()=>{
    console.log("server is listening on port 2500")
})