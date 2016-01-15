var gulp            = require("gulp"),
    browserify      = require("browserify"),
    reactify        = require("reactify"),
    concat          = require("gulp-concat"),
    sass            = require("gulp-sass"),
    streamify       = require("gulp-streamify"),
    uglify          = require("gulp-uglify"),
    cssmin          = require("gulp-cssmin"),
    rename          = require("gulp-rename"),
    connect         = require('gulp-connect'),
    autoprefixer    = require('gulp-autoprefixer'),
    sourcemaps      = require('gulp-sourcemaps'),
    source          = require('vinyl-source-stream'),
    shim            = require('browserify-shim'),
    react           = require('gulp-react');


// Sass
gulp.task('sass', function() {
    return gulp.src('./src/styles/**/*.scss')
    .pipe(sass()).on('error', errorHandler)
    .pipe(autoprefixer())
    .pipe(gulp.dest('./example/css'))
    .pipe(connect.reload());
});

// Server
gulp.task('webserver', function() {
    connect.server({
        root: ['example'],
        livereload: true
    });
});

gulp.task('browserify', function(){
    var bundler = browserify({
        entries: ['./src/scripts/main.jsx'],
        transform: [reactify],
        debug: true,
        extensions: ['.jsx'],
        cache: {}, packageCache: {}, fullPaths: true
    });

    bundler
    .bundle()
    .on('error', errorHandler)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./example/scripts'));
});

// Extract package.json metadata
function readPackageJSON () {
    var pkg = JSON.parse(require('fs').readFileSync('./package.json'));
    var dependencies = Object.keys(pkg.dependencies);
    var peerDependencies = Object.keys(pkg.peerDependencies);

    return {
        deps: dependencies.concat(peerDependencies),
        aliasify: pkg.aliasify
    };
}


gulp.task('browserify-standalone', function() {
    var pkg = readPackageJSON();
    var pkgName = 'select-popover';

    var standalone = browserify('./src/scripts/components/select-popover.jsx', {
        standalone: 'SelectPopover',
        extensions: ['.jsx']
    })
    .transform(reactify)
    .transform(shim);

    pkg.deps.forEach(function (pkg) {
        standalone.exclude(pkg);
    });

    return standalone.bundle()
        .on('error', errorHandler)
        .pipe(source(pkgName + '.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename(pkgName + '.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./dist'));
});


gulp.task('lib', function() {
    gulp.src('./src/scripts/components/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('./lib'));
});

gulp.task('cssdist', function() {
    return gulp.src('./example/css/select-popover.css')
    .pipe(gulp.dest('./dist'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'))
});


function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('watch', function() {
    gulp.watch('./src/styles/**/*.scss', ['sass']);
    gulp.watch('./src/scripts/**/*.jsx', ['browserify']);
});

gulp.task('default', ['browserify', 'lib', 'sass', 'webserver', 'watch']);
gulp.task('dist', ['browserify-standalone', 'sass', 'cssdist']);
