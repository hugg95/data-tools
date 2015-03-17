module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    uglify: {
        options: {
            mangle: true,
            preserveComments: false,
            banner: '/*\n <%= pkg.name %> v<%= pkg.version %>\n Author: <%= pkg.author %> <%= pkg.homepage %>\n License: MIT \n*/\n'
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
