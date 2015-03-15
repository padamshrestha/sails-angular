/**
 * Created by padam on 3/15/15.
 */
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var mainBowerFile = require('main-bower-files');
var inject = require('gulp-inject');

var paths ={
    temp: 'temp',
    tempVendor: 'temp/vendor',
    index: 'app/index.html'
}

gulp.task('default', ['scripts', 'serve']);

gulp.task('scripts', function(){

    var tempIndex = gulp.src(paths.index).pipe(gulp.dest(paths.temp));

    var scripts = gulp.src('app/**/*').pipe(gulp.dest(paths.temp));

    var tempVendors = gulp.src(mainBowerFile()).pipe(gulp.dest(paths.tempVendor));

    tempIndex.pipe(inject(scripts, { relative: true }))
        .pipe(inject(tempVendors, { relative: true, name: 'vendorInject' }))
        .pipe(gulp.dest(paths.temp));

});

gulp.task('serve', function(){
    gulp.src(paths.temp)
        .pipe(webserver({
            open: true
        }));
});


