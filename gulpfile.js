var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    pump = require('pump');

gulp.task('norm', function() {
  return gulp.src('node_modules/node-normalize-scss/_normalize.scss')
    .pipe(gulp.dest('src/assets/css'));
});

gulp.task('css', function (cb) {
  /*return gulp.src('src/assets/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream:true}));*/
  pump([
      gulp.src('src/assets/css/main.scss'),
      sass(),
      autoprefixer('last 4 version'),
      gulp.dest('app/assets/css'),
      cssnano(),
      rename({ suffix: '.min' }),
      gulp.dest('app/assets/css'),
      browserSync.reload({stream:true})
    ],
    cb
  );
});

gulp.task('js', function(cb){
  /*return gulp.src('src/assets/js/app.js')
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify().on('error', uglify.message))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once:true}));*/
  pump([
      gulp.src('src/assets/js/app.js'),
      uglify(),
      rename({ suffix: '.min' }),
      gulp.dest('app/assets/js'),
      browserSync.reload({stream:true, once:true})
    ],
    cb
  );
});

gulp.task('html', function(cb){
  /*return gulp.src('src/index.html')
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({stream:true}));*/
  pump([
      gulp.src('src/index.html'),
      gulp.dest('app/'),
      browserSync.reload({stream:true})
    ],
    cb
  );
});

gulp.task('img', function(cb){
  //return gulp.src('src/assets/img/**/*')
  //  .pipe(gulp.dest('app/assets/img/'))
  //  .pipe(browserSync.reload({stream:true}));
  pump([
      gulp.src('src/assets/img/**/*'),
      gulp.dest('app/assets/img/'),
      browserSync.reload({stream:true})
    ],
    cb
  );
});

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: "app"
    }
  });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['norm', 'css', 'js', 'html', 'img', 'browser-sync'], function () {
    gulp.watch('node_modules/node-normalize-scss/_normalize.scss', ['norm']);
    gulp.watch("src/assets/css/*.scss", ['css']);
    gulp.watch("src/assets/js/*.js", ['js']);
    gulp.watch("src/*.html", ['html']);
    gulp.watch("src/assets/img/**/*", ['img']);
    gulp.watch("app/*.html", ['bs-reload']);
});
