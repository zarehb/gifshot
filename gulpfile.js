/*
  Build File
*/

// Dependencies
const gulp = require('gulp');
const babel = require('rollup-plugin-babel');
const rollup = require('rollup-stream');
const uglify = require('gulp-uglify');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const rimraf = require('gulp-rimraf');
const fs = require('fs');

// Helpers
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const licenseText = '/*' + fs.readFileSync('./LICENSE.txt', 'utf8') + '\n*/\n';

gulp.task('build', () => {
    return rollup({
        entry: './src/modules/index.js',
        format: 'iife',
        plugins: [
            babel()
        ]
    })
        .pipe(gulp.src('./src/modules/index.js'))
        .pipe(source('gifshot.js'))
        .pipe(insert.prepend(licenseText))
        .pipe(gulp.dest('./src'));
});

// Task that creates a customized gifshot.js file (only including modules that are testable)
// and runs the Mocha unit tests and Instanbul test coverage
gulp.task('test', (cb) => {
    gulp.src('src/gifshot.js')
        .pipe(istanbul()) // Covering files
        .on('finish', () => {
            gulp.src('tests/tests.js')
                .pipe(mocha({
                    reporter: 'nyan'
                }))
                .pipe(istanbul.writeReports()) // Creating the reports after tests runned
                .on('end', cb); // finished task
        });
});

// Copies src/gifshot.js to dist/gifshot.js
gulp.task('copy', () => {
    gulp.src(['./src/gifshot.js'])
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('./demo/js/dependencies/'));
});

// Uglify.js task that minifies dist/gifshot.js and adds gifshot.min.js to the build folder
gulp.task('minify', () => {
    gulp.src(['dist/gifshot.js'])
        .pipe(uglify())
        .pipe(rename('gifshot.min.js'))
        .pipe(insert.prepend(licenseText))
        .pipe(gulp.dest('./dist'))
        .pipe(gulp.dest('./demo/js/dependencies'))
});

// Cleanup task that removes certain temporary files
gulp.task('cleanup', () => {
    gulp.src(['./src/gifshot.js'], {
        read: false
    })
        .pipe(rimraf());
});

// The default build task (called when you run `gulp`)
gulp.task('default', ['build', 'copy', 'minify', 'cleanup']);

// The watch task that runs the default task on any gifshot module file changes
gulp.task('watch', () => {
    const watcher = gulp.watch('./src/modules/**/*.js', ['default']);

    watcher.on('change', (event) => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
