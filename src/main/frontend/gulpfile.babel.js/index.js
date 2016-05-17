import runSequence from 'run-sequence';
import gulp from 'gulp';
import './tasks/copy';
import './tasks/sass';
import './tasks/eslint';
import './tasks/watch';
import './tasks/uglify';
import './tasks/report';

gulp.task('default', () => {
  runSequence(
    [
      'eslint-all',
      'sass',
      'copy'
    ],
    'watch'
  );
});

gulp.task('build', () => {
  runSequence(
    [
      'copy',
      'sass-build'
    ],
    'uglify',
    'report'
  );
});
