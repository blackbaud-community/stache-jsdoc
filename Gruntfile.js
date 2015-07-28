"use strict";
module.exports = function(grunt) {

    grunt.initConfig({
        'stache_jsdoc': {
            options: {
                tmpPath: '.tmp-convert/',
                demoHtmlPath: 'docs/demo.html',
                demoJsPath: 'docs/demo.js',
                src: 'test/*/*.js',
                dest: 'test/data.json'
            },
            jsdoc2md: {
                separateOutputFilePerInput: {
                    options: {
                        json: true
                    },
                    files: [{
                        expand: true,
                        ext: '.json',
                        src: '<%= stache_jsdoc.options.src %>',
                        dest: '<%= stache_jsdoc.options.tmpPath %>'
                    }]
                }
            }
        },
        jsdoc2md: {
            oneOutputFile: '<%= stache_jsdoc.jsdoc2md.oneOutputFile %>',
            separateOutputFilePerInput: '<%= stache_jsdoc.jsdoc2md.separateOutputFilePerInput %>'
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.registerTask('default', 'stache_jsdoc');
};
