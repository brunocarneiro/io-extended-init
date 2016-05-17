import _browsersync from 'browser-sync';
import gulp from 'gulp';

let browserSync = _browsersync.create();

gulp.task('browserSync', () => {
  browserSync.init({
    notify: false,
    logLevel: 'silent',
    logSnippet: false,
    port: 9000,
    open: false,
    proxy: 'http://localhost:8080',
    ghostMode: {
      clicks: true,
      scroll: true,
      links: true,
      forms: true
    },
    ui: {
      port: 9001,
      weinre: {
        port: 9002
      }
    },
    watchTask: true
  });
});

export default browserSync;
