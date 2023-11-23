const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const newPostController = require('./controllers/newPost');
const homePageController = require('./controllers/home');
const getPostController = require('./controllers/getPost');
const flash = require('connect-flash');
const storePostController = require('./controllers/storePost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const validateController = require('./middleware/validationMiddleware');
const redirectAuthenticationMiddleware = require('./middleware/redirectAuthenticationMiddleware'); 
const authmiddleware = require('./middleware/authmiddleware');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

mongoose.connect('mongodb+srv://sahilbhanot98:test@cluster0.itu0uok.mongodb.net/myFirstDatabase1?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
global.loggedIn = null;


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use('/posts/store', validateController);
app.use(expressSession({
  secret: 'chch'
}));
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId
  next();
});

app.listen(4500, () => {
  console.log('App listening on port 4500');
});

app.get('/', homePageController);
app.post('/posts/store',authmiddleware ,storePostController);
app.get('/post/new',authmiddleware, newPostController);
app.get('/post/:id', getPostController);
app.get('/auth/register',redirectAuthenticationMiddleware, newUserController);
app.post('/user/register', redirectAuthenticationMiddleware,storeUserController);
app.get('/auth/login',redirectAuthenticationMiddleware, loginController);
app.post('/user/login',redirectAuthenticationMiddleware, loginUserController);