"use strict";
module.exports = function(grunt) {

    grunt.config.init({
        stache_jsdoc: {
            src: 'test/*/*.js',
            dest: 'test/data.json'
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.registerTask('default', 'stache_jsdoc');
};
