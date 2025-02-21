const gulp = require("gulp");
const less = require("gulp-less");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();

function styles() {
    return gulp.src("src/less/style.less")
        .pipe(less())
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({ server: { baseDir: "./" } });
    gulp.watch("src/less/**/*.less", styles);
    gulp.watch("*.html").on("change", browserSync.reload);
}

exports.styles = styles;
exports.serve = gulp.series(styles, serve);
exports.default = gulp.series(styles, serve);
