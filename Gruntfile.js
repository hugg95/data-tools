module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    uglify: {
        options: {
            mangle: true
        },
    dist: {
        files: {
            'dist/DataTools.min.js': ['src/DataTools.js']
        }
    }
    }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

};
