import gulp from 'gulp';
import replace from 'gulp-replace';
import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
    .option('name', {
        alias: 'n',
        description: 'Name of the new runner',
        type: 'string',
        demandOption: true
    })
    .help()
    .alias('help', 'h')
    .argv;

gulp.task('create-runner', function () {
    const runnerName = argv.name;
    console.log(`Creating new runner: ${runnerName}`);
    const runnerDir = `./${runnerName}`;
    console.log(`Creating new runner directory: ${runnerDir}`);

    // Create the new runner directory
    if (!fs.existsSync(runnerDir)){
        fs.mkdirSync(runnerDir);
    } else {
        // remove all files in the directory
        fs.readdirSync(runnerDir).forEach((file) => {
            fs.unlinkSync(`${runnerDir}/${file}`);
        });
    }

    // copy files from example folder
    gulp.src('./example/**/*')
        .pipe(gulp.dest(runnerDir));
    
    // Replace the placeholder with the new runner name
    return gulp.src(`${runnerDir}/*.json`)
        .pipe(replace('example', runnerName))
        .pipe(gulp.dest('dist/'));
});