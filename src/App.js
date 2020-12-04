const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const { APP_PORT } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// import middleware
const authMiddleware = require('./middlewares/auth');

// import route
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const categoryRoute = require('./routes/category');
const newsRoute = require('./routes/news');

<<<<<<< HEAD
app.use('/auth', authRoute);
app.use('/user', authMiddleware, userRoute);
app.use('/category', categoryRoute);
app.use('/news', authMiddleware, newsRoute);
=======
app.use('/auth', authRoute)
app.use('/user', authMiddleware, userRoute)
app.use('/category', categoryRoute)
app.use('/news', authMiddleware, newsRoute)
>>>>>>> 163612ffdbe62f91aa3044ec0984145c01434dec

app.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'backend running well',
  });
});

// provide static file(images)
app.use('/uploads', express.static('assets/uploads'));

app.listen(APP_PORT, () => {
  console.log(`Running on port ${APP_PORT}`);
});
