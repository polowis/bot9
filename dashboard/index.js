const express = require('express');
const app = express();
const hbs = require('hbs');
const port = 3001;

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
      res.render('index');
    })


app.listen(port, () => console.log(`Bot dashboard listening on port ${port}!`))