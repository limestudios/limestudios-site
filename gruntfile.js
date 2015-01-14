module.exports = function (grunt) {
  'use strict';
  require('jit-grunt')(grunt);

  var options = {
    prod: './releases/prod-release/',
    dev: './releases/dev-release/',
    src: './app/',
    assets: './dist/assets/',
    config: 'data/config/',
    expand: true,
    flatten: true,
    devHostname: 'localhost',
    devPort: 8000
  },
  opt = options;

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    /*
    ** grunt dev to start task
    ** then go to localhost:1313
    */
    connect: {
      options: {
        port: opt.devPort,
        hostname: opt.devHostname,
        livereload: 35728  
      },
      livereload: {  
        options: {  
          open: true,  
          base: opt.dev  
        }  
      }  
    },

    watch: {  
      assemble: {  
        files: [  
            opt.src + 'content/blog/*.{hbs,md}',  
            opt.src + 'content/pages/*.{hbs,md}',  
            opt.src + 'layouts/*.{hbs,md}',  
            opt.src + 'partials/*.{hbs,md}',
            opt.src + 'data/*.{json,yml}'
        ],  
        tasks: ['assemble']  
      },
      styles: {
        files: [opt.src + 'assets/less/**/*.less'], // which files to watch
        tasks: ['less', 'autoprefixer']
      },
      js: {
        files: [opt.src + 'assets/js/**/*.js'], // which files to watch
        tasks: ['copy:js']
      },
      livereload: {  
        options: {  
          livereload: '<%= connect.options.livereload %>'  
        },  
        files: [  
          opt.dev + '*.html',
          opt.dev + 'assets/css/*.css'  
        ]  
      },  
    },  

    /*
    ** grunt dev to start task
    ** then go to localhost:1313
    */
    assemble: {
      options: {
        flatten: true,
        data: [opt.config+'*.{json,yml}', 'package.json', opt.src + 'data/*.{json,yml}'],
      	assets: opt.assets,
        layout: 'app/layouts/default.hbs',
        partials: 'app/partials/**/*.hbs'
      },
      blog: {
        files: {
          'releases/dev-release/blog/': ['./app/content/blog/*.{hbs,md}' ],
        }
      },
      pages: {
      	options: {
	      permalinks: {
	        structure: ':basename/index.html'
	      }
	    },
        files: {
          'releases/dev-release/': ['./app/content/pages/*.{hbs,md}' ],
        }
      },
    },

    /*
    ** grunt dev to start task
    ** then go to localhost:1313
    */
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "./releases/dev-release/assets/css/styles.css": "./app/assets/less/styles.less" // destination file and source file
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
        src: opt.dev + '/assets/css/*.css',
        dest: opt.dev + '/assets/css/'
      },
    },

    /*
    ** grunt dev to start task
    ** then go to localhost:1313
    */
    copy: {
      js: {
        files: [
          {
            expand: opt.expand,
            cwd: opt.src + '/assets/',
            src: ['js/**'],
            dest: opt.dev + '/assets/'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: opt.expand,
            cwd: opt.dev,
            src: ['**/**'],
            dest: 'C:/Users/limestudios/Documents/Web Docs/limestudios.github.io'
          }
        ]
      },
      assets: {
        files: [
          {
            expand: opt.expand,
            cwd: opt.src + '/assets/less',
            src: ['fonts/**'],
            dest: opt.dev + '/assets/css'
          },
          {
            expand: opt.expand,
            cwd: opt.src + '/assets/',
            src: ['img/**'],
            dest: opt.dev + '/assets/'
          }
        ]
      }
    },

    /*
    ** grunt dev to start task
    ** then go to localhost:1313
    */
    'ftp-deploy': {
      'main-dev': {
        auth: {
          host: 'ftp.simplysusansite.com',
          port: 21,
          authKey: 'key1'
        },
        src: opt.dev,
        dest: '',
        exclusions: [opt.dev + '/assets/css/fonts',opt.dev + '/assets/img']
      },
      'main-prod': {
        auth: {
          host: 'ftp.simplysusansite.com',
          port: 21,
          authKey: 'key2'
        },
        src: opt.dev,
        dest: '',
        exclusions: [opt.dev + '/assets/css/fonts',opt.dev + '/assets/img']
      },
      'everything-dev': {
        auth: {
          host: 'ftp.simplysusansite.com',
          port: 21,
          authKey: 'key1'
        },
        src: opt.dev,
        dest: ''
      },
      'everything-prod': {
        auth: {
          host: 'ftp.simplysusansite.com',
          port: 21,
          authKey: 'key2'
        },
        src: opt.dev,
        dest: ''
      }
    }
  });

  /* grunt tasks */
  grunt.registerTask('default', ['connect:livereload','assemble','less','autoprefixer','copy','watch']); 
  //grunt.registerTask('default', ['assemble', 'connect']);
  //grunt.registerTask('default', ['less', 'autoprefixer', 'watch']);
  grunt.registerTask('styles', ['less', 'autoprefixer','watch']);
  grunt.registerTask('dev', ['connect']);
  grunt.registerTask('deploy-prod', ['copy:prod'])
};