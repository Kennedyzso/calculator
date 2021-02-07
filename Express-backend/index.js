const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());

require('./routes/basic')(app);

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Error!')
  });

let port = 3000;
let server = app.listen(port,function() {
    console.log("Running: " + port)
});