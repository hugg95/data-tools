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
                files: [
                    {src: ['src/datatools.core.js'], dest: 'dist/datatools.core.min.js'},
                    {src: ['src/xls.support.js'], dest: 'dist/xls.support.min.js'},
                    {src: ['src/datatools.core.js', 'src/xls.support.js'], dest: 'dist/datatools.xls.min.js'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

};
