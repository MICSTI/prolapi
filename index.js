const express = require('express');

const port = 3333;

const app = express();

// allow CORS from specified resources
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => res.status(200).send('👨‍💻 Hi there! This is the awesome Programming Language API 👩‍💻'));
const languages = require('./data');
app.get('/api/languages', (req, res) => res.status(200).json(languages));
app.get('/api/languages/:id', (req, res) => {
    const language = languages.find(item => item.id === parseInt(req.params.id));
    if (!language) {
        return res.status(404).send("Not found");
    }
    res.status(200).json(language);
});

app.listen(port, () => console.log(`🚀 The awesome Programming Language API is running on port ${port} 🚀`));

module.exports = app;