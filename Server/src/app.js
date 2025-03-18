import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
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

import userRoute from './routes/user.routes.js';
import prodRoute from './routes/product.routes.js';
import orderRoute from './routes/order.routes.js'
import cartRoute from './routes/Cart.routes.js';
import ratingRoute from "./routes/rating.routes.js";
import reviewRoute from "./routes/review.routes.js";
import couponRoute from "./routes/coupon.routes.js";
import paymetRoute from './routes/paymentgateway.routes.js'

app.use("/api/v1/users", userRoute)
app.use("/api/v1/product", prodRoute)
app.use("/api/v1/order",orderRoute)
app.use("/api/v1/cart", cartRoute)
app.use("/api/v1/rating", ratingRoute)
app.use("/api/v1/review",reviewRoute)
app.use("/api/v1/coupon",couponRoute)
app.use("/api/v1/payment",paymetRoute)

export {app}