var gulp        = require("gulp");
var handlebars  = require("gulp-handlebars");
var wrap        = require("gulp-wrap");
var declare     = require("gulp-declare");
var concat      = require("gulp-concat");
var less        = require("gulp-less");
var bower       = require("main-bower-files");
var _           = require("underscore");



//================================================
//  WATCH
//================================================

gulp.task("watch", function() {
  gulp.watch(hbsPath, ["templates"]);
  gulp.watch(lessPath, ["less"]);
  gulp.watch("bower.json", ["bower:assets"]);
});


//================================================
//  COMPILING ASSETS
//================================================

var hbsPath     = "templates/**/*.hbs";
var lessPath    = "less/**/*.less";


// -- HANDLEBARS TEMPLATES -- //

gulp.task("templates", function(){
  gulp.src(hbsPath)
    .pipe(handlebars())
    .pipe(wrap("Handlebars.template(<%= contents %>)"))
    .pipe(declare({
      namespace: "JST"
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("./js/"));
});


// -- LESS STYLESHEETS -- //

gulp.task("less", function() {
  gulp.src(lessPath)
    .pipe(less())
    .pipe(gulp.dest("./css"));
});


//================================================
//  BOWER ASSETS
//================================================

gulp.task("bower:assets", ["bower:assets:js",
                           "bower:assets:css",
                           "bower:assets:dev",
                           "bower:assets:fonts"]);

// -- JAVASCRIPT -- //

gulp.task("bower:assets:js", function() {
  var files, sorted, dev;

  // get all bower js assets
  files = bower({filter: "**/*.js"});

  // make sure backbone is last in list
  sorted = _.sortBy(files, function(path) {
    return path.match(/backbone\.js/) ? 1 : 0;
  });

  gulp.src(sorted)
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("vendor/js"));
});


// -- STYLESHEETS -- //

gulp.task("bower:assets:css", function() {
  var files;

  files = bower({filter: "**/*.css"});

  gulp.src(files)
    .pipe(concat("vendor.css"))
    .pipe(gulp.dest("vendor/css"));
});


// -- FONTS -- //

gulp.task("bower:assets:fonts", function(){
  var files;

  files = bower({filter: /\.(eot|svg|ttf|woff|woff2|otf)$/g});

  gulp.src(files)
    .pipe(gulp.dest("vendor/fonts"));
});

// -- DEV ASSETS -- //

gulp.task("bower:assets:dev", function(){
  var files;

  files = _.difference(bower({includeDev: true}), bower());

  gulp.src(files)
    .pipe(gulp.dest("vendor/dev"));
});
