const ejs = require('ejs');
const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');
const app = express();
const {connectDB} = require('./connection');
const URL = require('./models/url');
const {restrictToLoggedinUserOnly, checkAuth} = require('./middleware/auth')
const route = require('./routes/url');
const userRoute = require('./routes/user')
const staticRoute = require('./routes/staticRoute');

// Ejs
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/url', restrictToLoggedinUserOnly, route);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);

// Connection of DB

connectDB('mongodb://localhost:27017/short-url').then(() => {console.log("MongoDB Connected")})
.catch((err) => {
    console.log("Error", err);
});

app.get('/url/:shortId', async(req, res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOneAndUpdate(
        {
           shortID: shortId
        },
        {
            $push:{
                visitHistory: {timestamp: Date.now()}
            },
        }
    )
    if (!result) {
        return res.status(404).json({ message: 'Short URL not found' });
    }
    res.redirect(result.redirectURL);
})




app.listen(8001, ()=>{console.log('Server started 8001');
})

