const express = require('express');
const app = express();

const port = 8000;

// Usa o diretório 'public' para arquivos estáticos
app.use(express.static('public'));

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});