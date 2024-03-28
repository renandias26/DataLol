import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

var app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', function (req, res) {
    const _retfile = path.join(__dirname, '/views/index.html');
    res.render(_retfile);
});

app.listen(3001, () => {
    console.log("Client running on port 3001");
});
