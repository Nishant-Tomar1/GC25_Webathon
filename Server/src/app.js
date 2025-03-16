import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const app = express()

app.use(cors({
    origin :process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "1600kb"}))
app.use(express.urlencoded({
    extended : true,
    limit : "1600kb"
}))
app.use(express.static("dist"))
app.use(cookieParser())
app.use(bodyParser.json())

app.get('/', ( __, res) => {
    res.send('Server Working Successfully')
  })

export {app}