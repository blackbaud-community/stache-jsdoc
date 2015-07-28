"use strict";

/**
 * This grunt tasks converts multiple files to JSON via jsdoc2md.
 */
module.exports = function (grunt) {

    /**
     * Grabs the applicable config options from stache-jsdoc and passes them to jsdoc2md task.
     * Queue's up the jsdoc2md and stache-jsdoc-post callback tasks.
     */
    grunt.task.registerTask(
        'stache_jsdoc',
        'Convert JSDoc to Blackbaud Stache',
        [
            'jsdoc2md:separateOutputFilePerInput',
            'stache-jsdoc-post'
        ]
    );

    /**
     * The real reason for this package to even exist.
     * Adds additional Blackbaud specific details to the created JSON file.
     */
    grunt.task.registerTask(
        'stache-jsdoc-post',
        'Automatically called after running jsdoc2md task',
        function () {

            var src = grunt.config.get('stache_jsdoc.options.tmpPath'),
                dest = grunt.config.get('stache_jsdoc.options.dest'),
                files = grunt.file.expand(src + '/**/*.json'),
                combined = [],
                addFile = function (json, folder, key) {
                    var file = folder + 'docs/demo.' + key;
                    if (grunt.file.exists(file)) {
                        json['example-' + key] = grunt.file.read(file);
                    }
                }

            grunt.file.expand(src + '/**/*.json').forEach(function (el) {
                var json = grunt.file.readJSON(el)[0],
                    file = el.replace(src, ''),
                    folder = file.substr(0, file.lastIndexOf('/') + 1);
                addFile(json, folder, 'html');
                addFile(json, folder, 'js');
                combined.push(json);
            });

            grunt.log.writeln('Writing ' + dest);
            grunt.file.write(
                dest,
                JSON.stringify(combined, null, 2)
            );
        }
    );
};
