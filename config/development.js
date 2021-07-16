import { src, dest, watch, parallel } from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import streamSeries from 'stream-series';
import sass from 'sass';
import bs from 'browser-sync';
import { source, dist, watches } from './paths';

const $ = gulpLoadPlugins();
const browserSync = bs.create();
const scss = $.sass(sass);

const styles = () => (
	src(source.sass)
		.pipe($.plumber())
		.pipe(scss({
			outputStyle: 'expanded'
		}).on('error', scss.logError))
		.pipe($.purifycss(['./src/scripts/*.js', './src/*.html']))
		.pipe($.autoprefixer())
		.pipe(dest(dist.dev.sass))
		.pipe(browserSync.stream())
);

const scripts = () => (
	src(source.js)
		.pipe($.plumber())
		.pipe($.babel())
		.pipe(dest(dist.dev.js))
);

const html = () => (
	src(source.html)
		.pipe(streamSeries(styles(), scripts()))
		.pipe(dest(dist.dev.html))
);

const scriptsWatch = done => {
	browserSync.reload();
	done();
};

const serve = () => {
	const files = [watches.html];

	browserSync.init({
		open: false,
		notify: false,
		server: { baseDir: ['./.tmp'] }
	});

	watch(source.html, parallel(html));
	watch(watches.sass, parallel(styles));
	watch(watches.js, parallel(scripts, scriptsWatch));
	watch(files).on('change', browserSync.reload);
};

export { html, serve };