import { src, dest } from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import streamSeries from 'stream-series';
import sass from 'sass';
import bs from 'browser-sync';
import { source, dist, builds } from './paths';

const $ = gulpLoadPlugins();
const browserSync = bs.create();
const scss = $.sass(sass);

const styles = () => (
	src(source.sass)
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe(scss().on('error', scss.logError))
		.pipe($.purifycss(['./src/scripts/*.js', './src/*.html']))
		.pipe($.csso({ debug: true }))
		.pipe($.autoprefixer())
		.pipe($.sourcemaps.write('../styles'))
		.pipe(dest(dist.prod.sass))
);

const scripts = () => (
	src(source.js)
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.babel())
		.pipe($.uglify())
		.pipe($.sourcemaps.write('../scripts'))
		.pipe(dest(dist.prod.js))
);

const html = () => (
	src(source.html)
		.pipe(streamSeries(styles(), scripts()))
		.pipe($.htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: { compress: { drop_console: true } },
			processConditionalComments: true,
			removeComments: true,
			removeEmptyAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		}))
		.pipe(dest(dist.prod.html))
);

const serve = () => {
	browserSync.init({
		open: false,
		notify: false,
		server: { baseDir: ['./build'] }
	});
};

const size = () => (
	src(builds)
		.pipe($.size({
			showFiles: true,
			showTotal: false
		}))
);

export { html, serve, size };