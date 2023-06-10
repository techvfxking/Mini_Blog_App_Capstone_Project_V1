import express from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as colors from 'colors'
import cors from 'cors'
import defaultRouter from './routes/defaultRoute.js'
import connectMongoDB from './configs/connectMongoDB.js'
import postsRouter from './routes/postsRoute.js'
import usersRouter from './routes/usersRoute.js'

dotenv.config()

connectMongoDB()

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

const PORT = 8080 || process.env.PORT

const server = app.listen(PORT, () => {
  const address = server.address()
  const host = address.address === '::' ? 'localhost' : address.address
  const port = address.port

  if (process.env.ENV === 'DEV')
    console.log(`Server is running at http://${host}:${port}`.bgMagenta)
  else console.log(`Server is running at https://${host}:${port}`.bgMagenta)
})

app.use(defaultRouter)

app.use(`${process.env.BASE_PATH}/posts`, postsRouter)

app.use(`${process.env.BASE_PATH}/users`, usersRouter)
