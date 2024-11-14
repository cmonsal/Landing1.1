"use strict";
const upath = require("upath");
const sh = require("shelljs");
const renderPug = require("./render-pug");

const srcPath = upath.resolve(upath.dirname(__filename), "../src");

// Explicitly process both English and Spanish templates
function processTemplates() {
  const englishTemplate = upath.resolve(srcPath, "pug/index.pug");
  const spanishTemplate = upath.resolve(srcPath, "pug/index-es.pug");

  renderPug(englishTemplate, "dist/index.html");
  renderPug(spanishTemplate, "dist/index-es.html");
}

processTemplates();
