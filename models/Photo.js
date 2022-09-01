const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create Schema => şablon 
const PhotoSchema = new Schema(
    {
        title: String,
        description: String,
        image: String,
        dateCreated: {
            type:Date,
            default: Date.now // fotografın yüklendiği zamanı tutar tarih değişmez
        }
    }
)
// collection oluşturma
const Photos = mongoose.model('photos', PhotoSchema);

module.exports = Photos;