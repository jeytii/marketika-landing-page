import { task, series, src, dest } from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import realFavicon from 'gulp-real-favicon';
import del from 'del';
import fs from 'fs';

import * as devStreams from './config/development';
import * as prodStreams from './config/production';

const $ = gulpLoadPlugins()
const isDev = process.env.NODE_ENV === 'development';
const faviconMarkupsJson = 'favicons.json';

task('html', $.if(isDev, devStreams.html, prodStreams.html));
task('clean', del.bind(null, ['build', '.tmp', 'favicons.json']));
task('size', prodStreams.size);

task('generate-favicon', done => {
    realFavicon.generateFavicon({
        masterPicture: 'src/icon.png',
        dest: isDev ? '.tmp/favicons' : 'build/favicons',
        iconsPath: '/favicons',
        design: {
            ios: {
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {
                design: 'raw'
            },
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: '#da532c',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#ffffff',
                manifest: {
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'silhouette',
                themeColor: '#5bbad5'
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false,
            readmeFile: false,
            htmlCodeFile: false,
            usePathAsIs: false
        },
        markupFile: faviconMarkupsJson
    }, () => {
        done();
    });
});

task('inject-favicon-markups', () => (
    src(['build/*.html', '.tmp/*.html'])
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(faviconMarkupsJson)).favicon.html_code))
        .pipe(dest('build'))
));

task('serve', series('clean', 'html', 'generate-favicon', 'inject-favicon-markups', devStreams.serve));
task('build', series('clean', 'html', 'generate-favicon', 'inject-favicon-markups', 'size'));
task('build:serve', series('clean', 'html', 'size', 'generate-favicon', 'inject-favicon-markups', prodStreams.serve));