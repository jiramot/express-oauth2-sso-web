import express, {NextFunction, Request, Response} from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import routes from './routes'
import login from './routes/login'
// import logout from './routes/logout'
// import consent from './routes/consent'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'pug')

app.use('/favicon.ico', express.static('public/favicon.ico'));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/login', login)
// app.use('/logout', logout)
// app.use('/consent', consent)

app.use((req, res, next) => {
    next(new Error('Not Found'))
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).render('error', {
        message: err.message,
        error: {}
    })
})

const listenOn = Number(process.env.PORT || 3000)
app.listen(listenOn, () => {
    console.log(`Listening on http://0.0.0.0:${listenOn}`)
})
