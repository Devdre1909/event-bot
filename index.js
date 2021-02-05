const http = require('http');
const express = require('express');

const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.use(express.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {

  const twiml = new MessagingResponse();

  const sender = {
    phone: req.body.From.split(':')[1],
    name: req.body.ProfileName
  }


twiml.message(`Hello, ${sender.name}... How are you doing today?`)


  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());

});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});