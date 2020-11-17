var fs = require('fs');

var uglify = require("uglify-js").minify;
var cssmin = require('cssmin');

var style = fs.readFileSync("src/style.css", encoding='utf8');
var js = fs.readFileSync("src/slide.js", encoding='utf8');
var html = fs.readFileSync("src/slide.html", encoding='utf8');

var css = fs.readFileSync("src/slides.css", encoding='utf8');
var slides = fs.readFileSync("src/slides.md", encoding='utf8');

var inline = html
  .replace(/<script src="slide.js"><\/script>/, '<script>'+uglify(js, {fromString: true}).code+'</script>')
  .replace(/<link .*href="style.css">/, '<style>'+cssmin(style)+'</style>')
  .replace(/<style.*>.*slides.css[^<]*<\/style>/, '<script media="screen">\n'+cssmin(css)+'</style>')
  .replace(/<pre id="slide">[^<]*<\/pre>/m, '<pre>\n'+slides+'</pre>');

console.log(inline);
