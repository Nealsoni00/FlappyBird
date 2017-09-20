var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 1234));

app.use(express.static('public'))


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
})


app.listen(app.get('port'), e=>{
  console.log("Server running");
});
