const express = require('express');
const serverStatic = require('server-static');
const app = express();
const path = require('path');

app.use('/', serverStatic(path.join(__dirname, '/dist')))

app.get('/.*/', (req, res) =>
    res.sendFile(
        path.join(__dirname, '/dist/index.html')
    )
)

const port = process.env.PORT || 8080
app.listen(port)

app.use()