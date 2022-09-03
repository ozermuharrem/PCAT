const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo')
const app = express();
const fs = require('fs')

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


app.get('/' , async (req, res) => {

  const photos = await Photo.find({}).sort('-dateCreated');
  // res.sendFile(path.resolve(__dirname , "temp/index.html")) // ejs kullanmadan bu şekide send edilir
   res.render('index', {
    photos
  });
})

app.get('/photos/:id', async (req, res) => {
  // res.sendFile(path.resolve(__dirname , "temp/about.html"))
  //res.render('about');
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo
  })
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
  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads';

  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.images;
  let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;
  
  uploadeImage.mv(uploadPath ,   async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name
    });
  res.redirect('/');
  });
 });


 // edit db 

 app.get('/photos/edit/:id',async (req,res) => {
  const photo = await Photo.findOne({_id : req.params.id });
  res.render('edit', {
    photo
  })
 });


 //update

 app.put('/photos/:id', async (req,res) => {
  const photo = await Photo.findOne({_id : req.params.id});
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
 })


 // delete 

 app.delete('/photos/:id',async (req, res) => {
 // console.log(req.params.id)

  const photo = await Photo.findOne({_id: req.params.id});

  let deletedImage = __dirname + '/public' + photo.image;

  fs.unlinkSync(deletedImage);

  await Photo.findByIdAndRemove(req.params.id);

  res.redirect('/')

 })

const port = 3000;

app.listen(port , () => {
    console.log(`sunucu ${port} portunda başlatıldı`);
})