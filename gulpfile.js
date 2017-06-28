/*
  Build File
*/

// Dependencies
const gulp = require('gulp');
const runSequence = require('run-sequence').use(gulp);
const babel = require('rollup-plugin-babel');
const rollup = require('rollup');
const iife = require("gulp-iife");
const uglify = require('gulp-uglify');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const fs = require('fs');

// Helpers
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const licenseText = '/*' + fs.readFileSync('./LICENSE.txt', 'utf8') + '\n*/\n';

gulp.task('build', (cb) => {
    rollup.rollup({
        entry: 'src/modules/index.js',
        format: 'iife',
        plugins: [
            babel({
                plugins: [
                    'external-helpers'
                ],
                presets: [
                      [
                            'es2015',
                            {
                                'modules': false
                            }
                      ]
                ]
            })
        ]
    }).then((bundle) => {
        bundle.write({
            dest: 'src/gifshot.js',
            format: 'es'
        });

        cb();
    })
});

// Wrap IIFE
gulp.task('iife', () => {
    return gulp.src('src/gifshot.js')
        .pipe(iife({
            params: ['window', 'document', 'navigator', 'undefined'],
            args: ['typeof window !== "undefined" ? window : {}', 'typeof document !== "undefined" ? document : { createElement: function() {} }', 'typeof window !== "undefined" ? window.navigator : {}']
        }))
        .pipe(gulp.dest('src'));
});

// Task that runs the Mocha unit tests and Instanbul test coverage
gulp.task('test', (cb) => {
    gulp.src('src/gifshot.js')
        .pipe(istanbul()) // Covering files
        .on('finish', () => {
            gulp.src('tests/tests.js')
                .pipe(mocha({
                    reporter: 'nyan'
                }))
                .pipe(istanbul.writeReports()) // Creating the reports after tests runned
                .on('end', cb);
        });
});

// Copies src/gifshot.js to dist/gifshot.js
gulp.task('copy', () => {
    return gulp.src('src/gifshot.js')
        .pipe(insert.prepend(licenseText))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('demo/js/dependencies'));
});

// Uglify.js task that minifies dist/gifshot.js and adds gifshot.min.js to the build folder
gulp.task('minify', () => {
    return gulp.src(['dist/gifshot.js'])
        .pipe(uglify())
        .pipe(rename('gifshot.min.js'))
        .pipe(insert.prepend(licenseText))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('demo/js/dependencies'));
});

// The default build task (called when you run `gulp`)
gulp.task('default', function () {
    runSequence('build', 'iife', 'copy', 'minify');
});

// The watch task that runs the default task on any gifshot module file changes
gulp.task('watch', () => {
    const watcher = gulp.watch('src/modules/**/*.js', ['default']);

    watcher.on('change', (event) => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
