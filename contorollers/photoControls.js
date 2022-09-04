const Photo = require('../models/Photo')
const fs = require('fs')


exports.getAllPhotos = async (req, res) => {

  const page = req.query.page || 1; // başlangıç sayfası veya ilk sayfa
  const photosPerPage = 2; // her sayfada bulunacak fotograf sayısı
  const totalPhotos = await Photo.find().countDocuments(); // toplam fotograf sayısı
  const photos = await Photo.find({})
  .sort('-dateCreated') // sıralama
  .skip((page -1 ) * photosPerPage) // pas geçmek için
  .limit(photosPerPage); // her sayfada gösterilecke foğraf sayısı
  res.render('index', {
     photos: photos,
     current:page,
     pages: Math.ceil(totalPhotos / photosPerPage)
   });
}

  exports.getPhoto = async (req, res) => {

    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
      photo
    })
  }

  exports.createPhoto = async (req,res) => {
    const uploadDir = 'public/uploads';
  
    if(!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
    }
  
    let uploadeImage = req.files.images;
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;
    
    uploadeImage.mv(uploadPath ,   async () => {
      await Photo.create({
        ...req.body,
        image: '/uploads/' + uploadeImage.name
      });
    res.redirect('/');
    });
   }

   exports.updatePhoto = async (req,res) => {
    const photo = await Photo.findOne({_id : req.params.id});
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
  
    res.redirect(`/photos/${req.params.id}`);
   }

   exports.deletePhoto = async (req, res) => {
    // console.log(req.params.id)
   
     const photo = await Photo.findOne({_id: req.params.id});
   
     let deletedImage = __dirname + '/../public' + photo.image;
   
     fs.unlinkSync(deletedImage);
   
     await Photo.findByIdAndRemove(req.params.id);
   
     res.redirect('/')
   
    }