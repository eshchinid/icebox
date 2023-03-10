require(`dotenv`).config();

const express =require('express');
const router = require('./routes/index')
const bodyParser = require('body-parser')

const PORT = process.env.PORT
const app = express();
app.use(bodyParser.json())
app.use('/api',router);



const start = async () => {
    try{
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}
start();
