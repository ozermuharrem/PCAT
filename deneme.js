const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connection db => veri tabanına ulaşmak için
mongoose.connect('mongodb://localhost/pcat-test-db');


// schema oluşturma => şablon oluşturma
const PhotoSchema = new Schema({
    title: String,
    description:String
});

// döküman oluşturma 
const photos = mongoose.model('photos', PhotoSchema)

//create a photo => oluşturmak istediğim veriyi kullanma
photos.create({
    title: "İnsan Fotoğrafları", description: "Kod yazarken keşke kendi yüzümü görebilseydim"
})