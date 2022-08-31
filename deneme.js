const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const util= require('util');
// const encoder = new util.TextEncoder('utf-8');
// veri tabanına bağlanma

mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

// schema oluşturma => şablon oluşturma

let PhotoSchema = new Schema(
    {
        title: string,
        description: string
    }
)

const photos = mongoose.model('photos', PhotoSchema);

//create a photo 

photos.create({
    title: "Bilgisayar Fotoğrafları", description: "Yanlış ellerdeki bilgisayarlar ne kadar da masum bakıyorlar"
})