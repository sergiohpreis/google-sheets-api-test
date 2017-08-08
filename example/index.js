const express = require('express');
const app = express();

// Usa o diretório 'public' para arquivos estáticos
app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});