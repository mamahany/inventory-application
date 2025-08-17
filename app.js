const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const languageRouter = require('./routes/languageRouter');
const authorRouter = require('./routes/authorRouter');
const frameworkRouter = require('./routes/frameworkRouter')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index');
})
app.use('/language', languageRouter);
app.use('/author', authorRouter);
app.use('/framework', frameworkRouter);

app.use((req, res, next) => {
    res.status(404).render('errorPage', {title:"Page not found", message:"404 - Page Not Found"});
});

app.use((err, req, res, next) => {
    console.error(err.stack);
  
    const status = err.status || 500;
    if (status === 404) {
      return res.status(404).render('errorPage', {title:"Page not found", message:"404 - Page Not Found"});
    }
    res.status(500).render('errorPage', {title:"Server error", message:`500 - unexpected error :(`});
  });

app.listen(process.env.PORT, (error)=>{
    if(error){
        console.log(error);
    }
    console.log(`Server listening on port ${process.env.PORT}`);
})