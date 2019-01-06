import { task, series, parallel } from 'gulp'
import env from 'gulp-environment'
import del from 'del'

import * as devStreams from './config/dev-streams'
import * as prodStreams from './config/prod-streams'
import { source } from './config/paths'

const ifDev = env.if.development.bind(null)

task('html', ifDev(devStreams.html).else(prodStreams.html))
task('images', ifDev(devStreams.images).else(prodStreams.images))
task('clean', del.bind(null, ['build/**', '.tmp/**']))
task('size', prodStreams.size)

task('serve', series('clean', parallel('html', 'images'), devStreams.serve))
task('build:serve', series('clean', parallel('html', 'images'), 'size', prodStreams.serve))