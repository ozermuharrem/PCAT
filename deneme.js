const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connection db => veri tabanına ulaşmak için
mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser : true,
    useUnifiedTopology: true
});


// schema oluşturma => şablon oluşturma
const PhotoSchema = new Schema({
    title: String,
    description:String
});

// döküman oluşturma 
const photos = mongoose.model('photos', PhotoSchema)

//create a photo => oluşturmak istediğim veriyi kullanma
// photos.create({
//     title: "Hayvan Fotoğrafları", description: "Kediler neden bu kadar meraklı"
// })

// photos.find({} , (err,data)=>{
    
//    console.log(data);
// })

// id sine göre güncelleme

// const id = "6310c547656f1d90a0342497";
// photos.findByIdAndUpdate(id, {
//     title: "Photo 55555",
//     description : "update işlemleri nasıl yapılır oynat bakalım"
// },
// {
//     new:true
// }, (err, data) => {
//     console.log(data);
// })

// id sine göre eleman silem

const id = "630fd74bdc067e2e9b2055f7";

photos.findByIdAndDelete(id, (err, data) => {
    console.log('veri silindi');
})

photos.find({} , (err,data) => {
    console.log(data);
});