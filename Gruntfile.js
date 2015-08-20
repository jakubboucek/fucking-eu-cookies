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
			script: {
				src: 'source/cookies.js',
				dest: 'dist/cookies.js',
				options: {
					process: function(content, path) {
						grunt.config.set('css', grunt.file.read('dist/style.css'));
						return grunt.template.process(content);
					}
				}
			}
		},
		concat: {
			cz: {
				src: ['source/lang.cz.js','dist/cookies.js'],
				dest: 'dist/cz.js',
			},
			en: {
				src: ['source/lang.en.js','dist/cookies.js'],
				dest: 'dist/en.js',
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n *  Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.author.url %>) */\n'
			},
			build: {
				files: {
					'build/cz.js': ['dist/cz.js'],
					'build/en.js': ['dist/en.js']
				}
			}
		},
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');

	// Default task(s).
	grunt.registerTask('default', ['less','copy','concat','uglify']);

};