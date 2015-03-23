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
                    {src: ['src/xlsx.support.js'], dest: 'dist/xlsx.support.min.js'},
                    {src: ['src/datatools.core.js', 'src/xlsx.support.js'], dest: 'dist/datatools.xlsx.min.js'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

};
