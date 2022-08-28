const express = require('express');
const path = require('path')

const app = express();

// const myLogger = (req ,res, next) => {
//     console.log("Log 1");
//     next();
// }

// const myLogger2 = (req, res, next) => {
//     console.log("Log 2");
//     next();
// }


//midllewares
app.use(express.static('public'));
//app.use(myLogger)
//app.use(myLogger2);

app.get('/' , (req, res) => {
   res.sendFile(path.resolve(__dirname , "temp/index.html"))
})

app.get('/about.html', (req, res) => {
    res.sendFile(path.resolve(__dirname , "temp/about.html"))
})









const port = 3000;

app.listen(port , () => {
    console.log(`sunucu ${port} portunda başlatıldı`);
})