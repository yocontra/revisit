# revisit [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Support us][gittip-image]][gittip-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]


## Information

<table>
<tr>
<td>Package</td>
<td>revisit</td>
</tr>
<tr>
<td>Description</td>
<td>Wrapper around revisit.link spec</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>


This is a work in progress - stay tuned.

## Usage

## Install

```
npm install revisit --save
```

## Examples

## Server

```js
var revisit = require('revisit');

// start a server that transforms data
var server = revisit.server(function(buf, cb) {
  // do something to buffer
  cb(null, buf);
});

// revisit.server returns an express server
// so you can tack on any middleware here

server.listen(8080);
```

```js
var revisit = require('revisit');

// start a server that transforms data
var server = revisit.server({
  limit: '10mb', // upload limit
  transform: function(buf, cb) {
    // do something to the buffer
    cb(null, buf);
  }
});

// revisit.server returns an express server
// so you can tack on any middleware here

server.listen(8080);
```

## Client

```js
var revisit = require('revisit');

var data = fs.createReadStream('yo.jpg');

var glitch = revisit.transform('http://meatcub.es:8000/glitch?direction=horizontal');
var messColor = revisit.transform('http://meatcub.es:8000/colorize?tint=solar');

// write file to server
data
  .pipe(glitch())
  .pipe(messColor())
  .pipe(fs.createWriteStream('yo-glitched.jpg'));
```

## LICENSE

(MIT License)

Copyright (c) 2014 Eric Schoffstall <contra@wearefractal.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




[gittip-url]: https://www.gittip.com/WeAreFractal/
[gittip-image]: http://img.shields.io/gittip/WeAreFractal.svg

[downloads-image]: http://img.shields.io/npm/dm/revisit.svg
[npm-url]: https://npmjs.org/package/revisit
[npm-image]: http://img.shields.io/npm/v/revisit.svg

[travis-url]: https://travis-ci.org/contra/revisit
[travis-image]: https://travis-ci.org/contra/revisit.png?branch=master

[coveralls-url]: https://coveralls.io/r/contra/revisit
[coveralls-image]: https://coveralls.io/repos/contra/revisit/badge.png

[depstat-url]: https://david-dm.org/contra/revisit
[depstat-image]: https://david-dm.org/contra/revisit.png

[david-url]: https://david-dm.org/contra/revisit
[david-image]: https://david-dm.org/contra/revisit.png?theme=shields.io
