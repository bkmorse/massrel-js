module.exports = function(grunt) {

  var banner = [
    '  /*!',
    '   * <%= pkg.name %> <%= pkg.version %>',
    '   *',
    '   * Copyright <%= (new Date()).getYear() %> Mass Relevance',
    '   *',
    '   * Licensed under the Apache License, Version 2.0 (the "License");',
    '   * you may not use this work except in compliance with the License.',
    '   * You may obtain a copy of the License at:',
    '   *',
    '   *    http://www.apache.org/licenses/LICENSE-2.0',
    '   */'
  ].join('\n');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: {
          baseUrl: './src',
          name: 'almond',
          include: 'massrel',
          namespace: 'massreljs',
          skipModuleInsertion: true,
          optimize: 'none',
          out: 'build/massrel.js'
        },
      }
    },
    concat: {
      build: {
        src: [
          'src/wrap.start.js',
          'build/massrel.js',
          'src/wrap.end.js'
        ],
        dest: 'build/massrel.js'
      },
      release: {
        options: {
          stripBanners: true,
          banner: banner
        },
        files: {
          'massrel.js': ['build/massrel.js'],
          'massrel.min.js': ['build/massrel.min.js'],
          'pkg/massrel.<%= pkg.version %>.js': ['build/massrel.js'],
          'pkg/massrel.min.<%= pkg.version %>.js': ['build/massrel.min.js']
        }
      }
    },
    uglify: {
      options: {
        preserveComments: 'some'
      },
      build: {
        src: 'build/massrel.js',
        dest: 'build/massrel.min.js'
      }
    },
    jasmine: {
      components: {
        src: [
          'build/massrel.js',
          'misc/*.js'
        ],
        options: {
          specs: 'test/spec/*.spec.js',
          keepRunner : false,
          vendor: [
            'lib/jquery.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['requirejs', 'concat:build', 'uglify', 'jasmine']);
  grunt.registerTask('release', ['build', 'concat:release']);

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

};
