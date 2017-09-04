module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			options: {
				compress: true,
			},
			main: {
				files: {
					"dist/style.css": "source/style.less"
				}
			},
		},
		copy: {
			styles: {
				src: 'index.html',
				dest: 'build/'
			},
			cz: {
				src: 'source/cookies.js',
				dest: 'dist/fucking-eu-cookies-cz.js',
				options: {
					process: function(content, path) {
						grunt.config.set('css', grunt.file.read('dist/style.css'));
						grunt.config.set('l18n', grunt.file.readJSON('source/l18n.cz.json'));
						grunt.config.set('options', grunt.file.readJSON('source/options.json'));
						return grunt.template.process(content);
					}
				}
			},
			en: {
				src: 'source/cookies.js',
				dest: 'dist/fucking-eu-cookies-en.js',
				options: {
					process: function(content, path) {
						grunt.config.set('css', grunt.file.read('dist/style.css'));
						grunt.config.set('l18n', grunt.file.readJSON('source/l18n.en.json'));
						grunt.config.set('options', grunt.file.readJSON('source/options.json'));
						return grunt.template.process(content);
					}
				}
			},
			sk: {
				src: 'source/cookies.js',
				dest: 'dist/fucking-eu-cookies-sk.js',
				options: {
					process: function(content, path) {
						grunt.config.set('css', grunt.file.read('dist/style.css'));
						grunt.config.set('l18n', grunt.file.readJSON('source/l18n.sk.json'));
						grunt.config.set('options', grunt.file.readJSON('source/options.json'));
						return grunt.template.process(content);
					}
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n *  Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.author.url %>) */\n'
			},
			build: {
				files: {
					'build/fucking-eu-cookies-cz.js': ['dist/fucking-eu-cookies-cz.js'],
					'build/fucking-eu-cookies-en.js': ['dist/fucking-eu-cookies-en.js'],
					'build/fucking-eu-cookies-sk.js': ['dist/fucking-eu-cookies-sk.js']
				}
			}
		},
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');

	// Default task(s).
	grunt.registerTask('default', ['less','copy','uglify']);

};
