'use strict';
const fs = require('fs');
const upath = require('upath');
const sh = require('shelljs');

module.exports = function renderAssets() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/assets');
    
    // Asegúrate de que el directorio de destino existe
    if (!sh.test('-e', destPath)) {
        sh.mkdir('-p', destPath);
    }

    // Copia todos los archivos y carpetas desde src/assets a dist/assets
    console.log(`### INFO: Copying assets from ${sourcePath} to ${destPath}`);
    try {
        sh.cp('-R', `${sourcePath}/*`, destPath);
        console.log('### SUCCESS: Assets copied successfully');
    } catch (error) {
        console.error('### ERROR: Failed to copy assets:', error);
        process.exit(1);
    }
};