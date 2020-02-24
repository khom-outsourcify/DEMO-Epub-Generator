const express = require('express');
const EpubGenerator = require('epub-generator');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));

var xhtml =
  '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>HELLO</title></head><body>Hello world from epub-generator!</body></html>';

var xhtml2 =
  '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>Second Page</title></head><body>My second page !<iframe width="560" height="315" src="https://www.youtube.com/embed/od69thyWn5c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></body></html>';

var epubStream = EpubGenerator({
  title: 'Hello World',
  author: 'LastLeaf',
  description: 'Made with epub-generator.',
  rights: 'CC-BY http://creativecommons.org/licenses/by/4.0/'
})
  .add('index.xhtml', xhtml, {
    title: 'HELLO',
    toc: true
  })
  .add('newpage.html', xhtml2, {
    title: 'Second Page',
    toc: true
  })
  .end()
  .pipe(fs.createWriteStream('./public/books/basic.epub'));

epubStream.on('error', function(err) {
  console.trace(err);
});

app.get('/', async (req, res) => {
  res.sendFile('./index.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
