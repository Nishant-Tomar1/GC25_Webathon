import dotenv from 'dotenv'
import http from 'http'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path : '.env'
})

const server = http.createServer(app)

const port = process.env.PORT || 4000;

connectDB()
.then(()=>{
    server.listen(port, ()=>{
        console.log(`Server listening on port : ${port}`);
    })
})
.catch((err)=> {
    console.log("Database Connection Failed !!!",err);
})