import path from 'path';

let gulp = {
  path: 'gulp',
  scripts: [path.normalize('gulpfile.babel.js/**/*.js')]
};

let src = {
  path: 'src',
  assets: path.normalize('src/assets'),
  files: path.normalize('src/**/*.{txt,xml,html,json,js,css,jpg,png,gif,svg,ico}'),
  images: path.normalize('src/**/*.{jpg,png,gif,svg}'),
  imagesFolder: path.normalize('src/assets/images'),
  html: path.normalize('src/**/*.html'),
  scripts: path.normalize('src/assets/scripts/**/*.js'),
  stylesheet: path.normalize('src/assets/**/main.scss'),
  stylesheets: path.normalize('src/assets/**/*.scss')
};

let rootPath = '../../../target/bh-ioextended-1.0-SNAPSHOT';

let dest = {
  path: rootPath,
  scripts: path.join(rootPath, path.normalize('assets/scripts/**/*.js')),
  images: path.join(rootPath, path.normalize('**/*.{jpg,png,gif,svg}')),
  imagesFolder: path.join(rootPath, path.normalize('assets/images')),
  stylesheets: path.join(rootPath, path.normalize('assets'))
};

export default {
  gulp,
  src,
  dest
};
