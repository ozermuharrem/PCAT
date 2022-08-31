const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();


//midllewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// ejs 

app.set("view engine", "ejs");


app.get('/' , (req, res) => {
  // res.sendFile(path.resolve(__dirname , "temp/index.html")) // ejs kullanmadan bu şekide send edilir
  res.render('index');
})

app.get('/about', (req, res) => {
   // res.sendFile(path.resolve(__dirname , "temp/about.html"))
  res.render('about');

})

app.get('/add', (req, res) => {
    // res.sendFile(path.resolve(__dirname , "temp/about.html"))
   res.render('add');
 
 })

 app.post('/photos', (req,res) => {
  console.log(req.body);
  res.redirect('/');
 })
 








const port = 3000;

app.listen(port , () => {
    console.log(`sunucu ${port} portunda başlatıldı`);
})