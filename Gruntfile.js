module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            styles: {
                src: ['index.html'],
                dest: 'build/',
                flatten: true,
                expand: true
            },
            cz: {
                src: 'source/cookies.js',
                dest: 'dist/cz.js',
                options: {
                    process: function (content, path) {
                        grunt.config.set('l18n', grunt.file.readJSON('source/l18n.cz.json'));
                        return grunt.template.process(content);
                    }
                }
            },
            en: {
                src: 'source/cookies.js',
                dest: 'dist/en.js',
                options: {
                    process: function (content, path) {
                        grunt.config.set('l18n', grunt.file.readJSON('source/l18n.en.json'));
                        return grunt.template.process(content);
                    }
                }
            },
            sk: {
                src: 'source/cookies.js',
                dest: 'dist/sk.js',
                options: {
                    process: function (content, path) {
                        grunt.config.set('l18n', grunt.file.readJSON('source/l18n.sk.json'));
                        return grunt.template.process(content);
                    }
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'build/cz.js': ['dist/cz.js'],
                    'build/en.js': ['dist/en.js'],
                    'build/sk.js': ['dist/sk.js']
                }
            }
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify']);

};
