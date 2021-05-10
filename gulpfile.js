const { src, dest, task, series, watch, parallel } = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const { DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS } = require('./gulp.config');

sass.compiler = require('node-sass');


//clean
task('clean', () => {
    console.log(env);
    return src(`${DIST_PATH}/*`, { read: false }).pipe(clean());
});

//copy
task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
});

task('copy:img', () => {
    return src(`${SRC_PATH}/images/**/*`).pipe(dest(`${DIST_PATH}/images`))
});

/*TODO
 Стоит ли мне собирать sprite svg 
 если я руками собрал ранее и 
 занес туда только те, что необходииы?
а другие иконки я не могу использовать (background)
*/

task('copy:video', () => {
    return src(`${SRC_PATH}/video/*`).pipe(dest(`${DIST_PATH}/video`));
});



// //compilate sass
//TODO баг в fancybox
//https://qna.habr.com/q/653645

task('styles', () => {
    // return src([...STYLES_LIBS, `${SRC_PATH}/styles/main.scss`])
    return src(`${SRC_PATH}/styles/main.scss`)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(env === 'dev',
            autoprefixer({
                cascade: false
            })
        ))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}/css`));
})

//TODO решение бага fancybox
task('allCss', () => {
    return src([...STYLES_LIBS, `${DIST_PATH}/css/main.min.css`])
        .pipe(concat('main.min.css'))
        .pipe(gulpif(env === 'prod', gcmq()))
        .pipe(gulpif(env === 'prod', cleanCSS({ compatibility: 'ie8' })))
        .pipe(dest(`${DIST_PATH}/css`));
})


// //scripts
/*
    TODO возможно как то сюда включить yandex map? 
    https://github.com/bruderstein/gulp-html-src

*/
task('scripts', () => {
    return src([...JS_LIBS, `${SRC_PATH}/scripts/*.js`])
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.js', { newLine: ";" }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}/scripts`));
})


//browser - sync
task('server', () => {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false,
    });
});

task('watch', () => {
    watch(`${SRC_PATH}/styles/**/*.scss`, series('styles'));
    watch(`${SRC_PATH}/*.html`, series('copy:html'));
    watch(`${SRC_PATH}/scripts/*.js`, series('scripts'));
})

//for dev
task('default',
    series('clean',
        parallel('copy:html', 'copy:img', 'copy:video', 'scripts'),
        'styles', 'allCss',
        parallel('watch', 'server')
    )
);

//for production
task('build',
    series('clean',
        parallel('copy:html', 'copy:img', 'copy:video', 'scripts'),
        'styles', 'allCss',
    )
);