const gulp = require('gulp');
const npmDist = require('gulp-npm-dist');

// Copy dependencies to ./public/libs/
gulp.task('copy:libs', function() {
  gulp.src(npmDist(), {base:'./node_modules'})
    .pipe(gulp.dest('./public/libs'));
});