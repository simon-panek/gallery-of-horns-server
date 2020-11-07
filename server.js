'use strict';

// require('dotenv').config();
const express = require('express'); //3rd party dependency

const app = express (); //application constant
const PORT = process.env.PORT || 3000; //application constant

//app.use(express.static('./public/index')); //express will serve the static directory "public"

app.get('/public', (request, response) => {
  response.sendFile(__dirname + '/public/index.html'); //servers our webpage
})

// app.get('/about-us', (request, response) => { //this works
//   response.send('i am the about us webpage');
// });

app.listen(PORT); // sets up access for incoming traffic on a port of heroku's choosing with local 3000 as a backup


// app.get('/hello', (request, response) => { //this works too
//   response.status(200).send('Hello');
// });
