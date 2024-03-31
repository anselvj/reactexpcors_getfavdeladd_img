const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;
let images = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/*
const corsOption =  {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOption)); */
// Enable CORS for all origins
app.use(cors());

app.use((req,rep, next) => {
    //set middleware logic
  next();
});

app.get('/api',(req,res) => {
    res.json({message: 'Hello World Express JSON Page'});
});

app.get('/images', (req, res) => {
    res.json(images);
  });
  
app.post('/images', (req, res) => {
    const { url } = req.body;
    const newImage = { id: images.length + 1, url };
    images.push(newImage);
    res.status(201).json(newImage);
});

app.patch('/images/:id/favorite', (req, res) => {
    const { id } = req.params;
    const image = images.find((img) => img.id === parseInt(id));
    if (image) {
        // Toggle favorite status
        image.favorite = !image.favorite;
        res.json(image);
    } else {
        res.status(404).send('Image not found');
    }
});

app.delete('/images/:id', (req, res) => {
    const { id } = req.params;
    images = images.filter((img) => img.id !== parseInt(id));
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
