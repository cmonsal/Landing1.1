'use strict';
const fs = require('fs');
const upath = require('upath');
const pug = require('pug');
const sh = require('shelljs');
const prettier = require('prettier');

// Define los archivos que queremos procesar
const pugFiles = [
    {
        input: 'src/pug/index-es.pug',
        output: 'dist/index.html'
    },
    {
        input: 'src/pug/index-en.pug',
        output: 'dist/index-en.html'
    }
];

// Asegúrate de que el directorio dist existe
const distPath = upath.resolve(upath.dirname(__filename), '../dist');
if (!sh.test('-e', distPath)) {
    sh.mkdir('-p', distPath);
}

// Procesa cada archivo
async function processPugFiles() {
    for (const file of pugFiles) {
        const filePath = upath.resolve(upath.dirname(__filename), '..', file.input);
        const destPath = upath.resolve(upath.dirname(__filename), '..', file.output);
        const srcPath = upath.resolve(upath.dirname(__filename), '../src');

        console.log(`### INFO: Rendering ${filePath} to ${destPath}`);
        
        try {
            if (!fs.existsSync(filePath)) {
                console.error(`### ERROR: File not found: ${file.input}`);
                process.exit(1);
            }

            const html = pug.renderFile(filePath, {
                doctype: 'html',
                filename: filePath,
                basedir: srcPath
            });

            const destPathDirname = upath.dirname(destPath);
            if (!sh.test('-e', destPathDirname)) {
                sh.mkdir('-p', destPathDirname);
            }

            const prettified = await prettier.format(html, {
                printWidth: 1000,
                tabWidth: 4,
                singleQuote: true,
                proseWrap: 'preserve',
                endOfLine: 'lf',
                parser: 'html',
                htmlWhitespaceSensitivity: 'ignore'
            });

            fs.writeFileSync(destPath, prettified);
            console.log(`### SUCCESS: Rendered ${file.input}`);
        } catch (error) {
            console.error(`### ERROR: Failed to render ${file.input}:`, error);
            process.exit(1);
        }
    }
}

// Ejecutar el procesamiento
processPugFiles().catch(error => {
    console.error('### ERROR:', error);
    process.exit(1);
});