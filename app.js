require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const productsRouter = require('./controllers/products');
const { userExtractor } = require('./middleware/auth');
const purchasesRouter = require('./controllers/purchases');
const logoutRouter = require('./controllers/logout');
const { MONGO_URI } = require('./config');


(async()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a Mongo DB');
    } catch (error) {
        console.log(error);
    }

})()


app.use(cors());
app.use(express.json());
app.use(cookieParser());

// rutas FE
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/store', express.static(path.resolve('views', 'store')));
app.use('/admin', express.static(path.resolve('views', 'admin')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));
app.use('/images', express.static(path.resolve('img')));


app.use(morgan('tiny'));

// Rustas BE
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/products', userExtractor, productsRouter);
app.use('/api/purchases', userExtractor, purchasesRouter);




module.exports = app;


