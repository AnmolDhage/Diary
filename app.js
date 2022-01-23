//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const _ = require('lodash');
require('dotenv').config();
const password = process.env.password;

const homeStartingContent = 'Click on Compose and start composing';
const aboutContent = 'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent = 'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';

const app = express();

mongoose.connect(`mongodb+srv://AnmolDhage:${password}@cluster0.bsna8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//Schemas

let postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

let Post = mongoose.model('Post', postSchema);

app.get('/post/:id', function (req, res) {
  let a = req.params.id;
  Post.findOne({ _id: a }, function (err, response) {
    if (!err) {
      res.render('post', { postTitle: response.title, postContent: response.content });
    }
  });
});

app.get('/', function (req, res) {
  Post.find({}, function (err, response) {
    res.render('home', { homeparacontent: homeStartingContent, posts: response });
  });
});

app.get('/about', function (req, res) {
  res.render('about', { aboutparacontent: aboutContent });
});

app.get('/contact', function (req, res) {
  res.render('contact', { contactparacontent: contactContent });
});

app.get('/compose', function (req, res) {
  res.render('compose');
});

app.post('/compose', function (req, res) {
  let post = new Post({
    title: req.body.post_title,
    content: req.body.post_content,
  });
  post.save(function (err, response) {
    if (!err) {
      res.redirect('/');
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Server started on port 3000');
});
