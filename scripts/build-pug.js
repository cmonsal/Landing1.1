'use strict';
const upath = require('upath');
const sh = require('shelljs');
const renderPug = require('./render-pug');

const srcPath = upath.resolve(upath.dirname(__filename), '../src');

sh.find(srcPath).forEach(_processFile);

function _processFile(filePath) {
    if (
        filePath.match(/\.pug$/)
        && !filePath.match(/include/)
        && !filePath.match(/mixin/)
        && !filePath.match(/\/pug\/layouts\//)
    ) {
        // Determine output filename based on input filename
        const outputFilename = filePath.includes('-es.pug') 
            ? 'index-es.html'
            : 'index.html';
        
        renderPug(filePath, `dist/${outputFilename}`);
    }
}
