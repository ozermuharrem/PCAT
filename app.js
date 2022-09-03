const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const ejs = require('ejs');
const app = express();
const photoController = require('./contorollers/photoControls')
const pageController = require('./contorollers/pageController');

//connect db

mongoose.connect('mongodb://localhost/Pcat-db', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
});



//midllewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})); // url de ki datayı okumak için
app.use(express.json()); // urldeki datayı json formatına sokmak için
app.use(fileUpload());
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}));


// ejs 

app.set("view engine", "ejs");


app.get('/' , photoController.getAllPhotos );

app.get('/photos/:id', photoController.getPhoto );

app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto ); // delete 
app.delete('/photos/:id', photoController.deletePhoto);
app.get('/about', pageController.getAboutPage );
app.get('/add', pageController.getAddPage );
app.get('/photos/edit/:id', pageController.getEditPage);// edit db 

const port = 3000;

app.listen(port , () => {
    console.log(`sunucu ${port} portunda başlatıldı`);
})