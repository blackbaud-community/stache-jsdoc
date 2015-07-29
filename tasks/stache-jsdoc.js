"use strict";

/**
 * This grunt tasks converts multiple files to JSON via jsdoc2md.
 */
module.exports = function (grunt) {

    var defaults = {
        tmpPath: '.tmp-convert/',
        demoPrefix: 'example-',
        demoFiles: [
            'docs/demo.html',
            'docs/demo.js'
        ],
        jsdoc2md: {
            separateOutputFilePerInput: {
                options: {
                    json: true
                },
                files: [{
                    expand: true,
                    ext: '.json',
                    src: '<%= stache_jsdoc.src %>',
                    dest: '<%= stache_jsdoc.tmpPath %>'
                }]
            }
        }
    };

    /**
     * Grabs the applicable config options from stache-jsdoc and passes them to jsdoc2md task.
     * Queue's up the jsdoc2md and stache-jsdoc-post callback tasks.
     */
    grunt.task.registerTask(
        'stache_jsdoc',
        'Convert JSDoc to Blackbaud Stache',
        function () {
            grunt.config.set('stache_jsdoc', this.options(defaults));
            grunt.config.set('jsdoc2md', grunt.config.get('stache_jsdoc.jsdoc2md'));
            grunt.task.run([
                'jsdoc2md:separateOutputFilePerInput',
                'stache-jsdoc-post'
            ]);
        }
    );

    /**
     * The real reason for this package to even exist.
     * Adds additional Blackbaud specific details to the created JSON file.
     */
    grunt.task.registerTask('stache-jsdoc-post', function () {
        var src = grunt.config.get('stache_jsdoc.tmpPath'),
            dest = grunt.config.get('stache_jsdoc.dest'),
            files = grunt.file.expand(src + '/**/*.json'),
            combined = [];

        grunt.file.expand(src + '/**/*.json').forEach(function (el) {
            var json = grunt.file.readJSON(el),
                file = el.replace(src, ''),
                folder = file.substr(0, file.lastIndexOf('/') + 1),
                demoPrefix = grunt.config.get('stache_jsdoc.demoPrefix'),
                demoFiles = grunt.config.get('stache_jsdoc.demoFiles');

            // Future implements may need to adjust this
            if (json && json.length === 1) {

                json = json[0];
                demoFiles.forEach(function (file) {
                    var path = folder + file,
                        ext = file.substr(file.lastIndexOf('.') + 1);
                    if (grunt.file.exists(path)) {
                        json[demoPrefix + ext] = grunt.file.read(path);
                    }
                });

                // Provide stache with a slug-safe key to use
                if (json.name) {
                    json.key = json.name.toLowerCase().replace(/ /g, '');
                }

                // No reason for us to namespace the custom-tags
                if (json.customTags && json.customTags.length > 0) {
                    json.customTags.forEach(function (el) {
                        json[el.tag] = el.value;
                    });
                    delete json.customTags;
                }

                // Keep combining our JSON file
                combined.push(json);
            }
        });

        grunt.log.writeln('Writing ' + dest);
        grunt.file.write(dest, JSON.stringify(combined, null, 2));
    });

    grunt.task.loadNpmTasks('grunt-jsdoc-to-markdown');
};
