'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data}/{,*/}*.{md,hbs,yml}'],
        tasks: ['newer:assemble']
      },
      templates: {
        files: ['<%= config.src %>/templates/**/*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      styles: {
        files: ['<%= config.src %>/assets/css/**/*.less'], // which files to watch
        tasks: ['styles']
      },
      js: {
        files: ['<%= config.src %>/assets/js/*.js'], // which files to watch
        tasks: ['copy:js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/**/*.html',
          '<%= config.dist %>/assets/css/*.css'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/**/*.hbs',
          plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap'],
          permalinks: {
            structure: ':basename/index.html'
          }
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/content/pages/*.hbs']
        }
      }
    },

    /*copy: {
      bootstrap: {
        expand: true,
        cwd: 'bower_components/bootstrap/dist/',
        src: '**',
        dest: '<%= config.dist %>/assets/'
      },
      theme: {
        expand: true,
        cwd: 'src/assets/',
        src: '**',
        dest: '<%= config.dist %>/assets/css/'
      }
    },*/
    
    copy: {
      fonts: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/assets/css/typography/fonts/',
            src: ['**'],
            dest: '<%= config.dist %>/assets/css/fonts'
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/assets/js/',
            src: ['**'],
            dest: '<%= config.dist %>/assets/js'
          }
        ]
      }
    },
    
    less: {
      development: {
        options: {
          compress: false,
        },
        files: {
          "<%= config.dist %>/assets/css/styles.css": "<%= config.src %>/assets/css/*.less"
        }
      }
    },
    
    /*
    ** grunt dev to start task
    ** then go to localhost:1313
    */
    autoprefixer: {
      options: {
        browsers: ['last 5 version' ]
      },
      styles: {
        expand: true,
        flatten: true,
        src: '<%= config.dist %>/assets/css/*.css',
        dest: '<%= config.dist %>/assets/css/'
      },
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml,css}']

  });

  grunt.registerTask('server', ['copy:fonts', 'build', 'connect:livereload', 'watch']);
  
  grunt.registerTask('styles', ['less', 'autoprefixer']);

  grunt.registerTask('build-new-content', ['newer:assemble']);
  grunt.registerTask('build-new', ['styles-new', 'newer:assemble']);
  grunt.registerTask('build', ['clean', 'styles', 'assemble']);

};
