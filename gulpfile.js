let project_folder = "public";
let source_folder = "#src";

// let fs = require("fs");

let path = {
  build: {
    // html: project_folder + "/",
    css: project_folder + "/stylesheets/",
    js: project_folder + "/javascripts/",
    img: project_folder + "/images/",
    // fonts: project_folder + "/fonts/",
  },
  src: {
    // html: [source_folder + "/*.html","!"+source_folder+"/_*.html"],
    css: [source_folder + "/scss/style.scss", source_folder+"/scss/slick.scss",  source_folder+"/scss/slick-theme.scss", source_folder+"/scss/styleBonus.scss"],
    js: source_folder + "/js/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    // fonts: source_folder + "/fonts/*.ttf",
  },
  watch: {
    // html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
  },
  clean: "./" + project_folder + "/"
};

let { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  scss = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  group_media = require("gulp-group-css-media-queries"),
  clean_css = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify-es").default,
  imagemin = require("gulp-imagemin");

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port: 4000,
    notify: false
  })
}

// function html() {
//   return src(path.src.html)
//     .pipe(fileinclude())
//     .pipe(dest(path.build.html))
//     .pipe(browsersync.stream())
// }

// Минификация CSS и автопрефиксы
function css() {
  return src(path.src.css)
    .pipe(scss({
      outputStyle: 'expanded' 
      // "compressed" сжатый 
    }))
    .pipe(group_media())
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 5 versions"],
      cascade:true
    }))
    .pipe(dest(path.build.css))
    // сжимает полученный css 
    .pipe(clean_css())
    // переименовывает сжатый css
    .pipe(rename({
      extname:".min.css"
    }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

// Минификация JS
function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
      extname:".min.js"
    }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

// Сжатие изображений
function images() {
  return src(path.src.img)
  .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interplaced: true,
        optimiationLevel:5
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

//Выгружает готовые шрифты в dist
// function fonts() {
//   src(path.src.fonts)
//     .pipe(ttf2woff())
//     .pipe(dest(path.build.fonts));
//   return src(path.src.fonts)
//     .pipe(ttf2woff2())
//     .pipe(dest(path.build.fonts));
// }


// Конвертирует шрифты в нужный формат в папке src
// gulp.task("otf2ttf", function () {
//   return src([source_folder + "/fonts/*.otf"])
//     .pipe(fonter({
//       formats: ['ttf']
//     }))
//     .pipe(dest(source_folder + "/fonts/"));
// })


// Запись имён шрифтов в файл fonts.scss
// function fontsStyle(params) {

//   let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
//   if (file_content == '') {
//   fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
//   return fs.readdir(path.build.fonts, function (err, items) {
//   if (items) {
//   let c_fontname;
//   for (var i = 0; i < items.length; i++) {
//   let fontname = items[i].split('.');
//   fontname = fontname[0];
//   if (c_fontname != fontname) {
//   fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
//   }
//   c_fontname = fontname;
//   }
//   }
//   })
//   }
//   }


// Функция колбэк для FS
// function cb() {
  
// }

function watchFiles(params) {
  // gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean(params) {
  return del(path.clean);
}

let build = gulp.series(clean,gulp.parallel(css,js,images));
let watch = gulp.parallel(build,watchFiles,browserSync);

// exports.webP = webP;
// exports.fontsStyle = fontsStyle;
// exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
// exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

