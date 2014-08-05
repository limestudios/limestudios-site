module.exports = function(grunt) {

  'use strict';
  
  var _ = require('lodash');
  var path = require('path');
  
  //Function for creating an array of files from each node in a JSON file
  function createPages(datasrc,template) {
    var data = grunt.file.readYAML(datasrc);
    var pageArray = [];

    for (var i = 0; i < data.pages.length; i++) { 
      pageArray.push({
        // the filename will determine how the page is named later
        filename: "" + i, //turn number into string for filename
        // the data for the current step from the json file
        data: data.pages[i],
        // add the template as the page content
        content: grunt.file.read(template)
      });
    }
    return _.flatten(pageArray);
  }
  
  var banner = function (alt) {
    var grunt = '<%=grunt.template.today("yyyy-mm-dd")%>', // get the current date
      version = ' - v<%=pkg.version%> - ', // get the version number from package.json
      name = '/*<%=pkg.name%>'; // get the name from package.json
    if (alt) {
      return name + ' - ' + alt + version + grunt + '*/';
    } else {
      return name + version + grunt + '*/';
    }
  };

  var hljs = require('highlight.js');

  var options = {
    prod: './dist/compressed',
    dev: './dist/development',
    src: './src',
    plugins: './src/plugins',
    tpl: './tpl',
    pages: './pages',
    posts:  './posts',
    projects: './projects',
    vendor: './bower_components',
    expand: true,
    devPort: 80,
    devHostname: 'localhost'
  },
  opt = options,
  devTarget = 'http://' + opt.devHostname + ':' + opt.devPort;    var site = grunt.config('site');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('src/data/site.yml'),
    vendor: grunt.file.readJSON('bower.json'),
      
    /*
     * Uploads to FTP server.
     */
    'ftp-deploy': {
        build: {
          auth: {
            host: 'limestudios.net',
            port: 21,
            authKey: 'key1'
          },
          src: opt.dev,
          dest: '/public_html'
        },
        css: {
            auth: {
              host: 'limestudios.net',
              port: 21,
              authKey: 'key1'
            },
          src: opt.dev + '/assets/css/',
          dest: '/public_html/assets/css/',
          exclusions: [opt.dev + '/assets/css/fonts']
        },
        fonts: {
            auth: {
              host: 'limestudios.net',
              port: 21,
              authKey: 'key1'
            },
          src: opt.dev + '/assets/css/fonts',
          dest: '/public_html/assets/css/fonts',
          //exclusions: [opt.dev + '/assets/css/fonts']
        },
        js: {
            auth: {
              host: 'limestudios.net',
              port: 21,
              authKey: 'key1'
            },
          src: opt.dev + '/assets/js/',
          dest: '/public_html/assets/js/',
          //exclusions: [opt.dev + '/assets/css/fonts']
        },
        pages: {
            auth: {
              host: 'limestudios.net',
              port: 21,
              authKey: 'key1'
            },
          src: opt.dev,
          dest: '/public_html',
          exclusions: [opt.dev + '/assets/css',opt.dev + '/assets/js']
        },
    },
      
    browserify: {
        dist: {
            files: {
                '<%=site.development%>/assets/js/bundle.js': ['./src/js/main.js'] 
            }
        }
    },
      
      
    /*
     * Remove all old files before creating the new files.
     */
    clean: { build: ['./dist'] },

    /*
    * Copy images and fonts to the build directories.
    */
    copy: {
      assets: {
        files: [
          {
            expand: opt.expand,
            cwd: opt.src + '/less/',
            src: ['fonts/**'],
            dest: opt.dev + '/assets/css'
          },
          {
            expand: opt.expand,
            cwd: opt.src + '/',
            src: ['img/**'],
            dest: opt.dev + '/assets/'
          },
          {
            expand: opt.expand,
            cwd: opt.src + '/',
            src: ['img/**'],
            dest: '<%=site.production%>/assets/'
          }
        ]
      }
    },

    /*
     * Compile LESS and lint using RECESS.
     */
    less: {
      options: {
        banner: banner(),
        compress: true,
        metadata: opt.src + '/less/data/*.{json,yml}'
      },
      styles: {
        options: {
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapFilename: opt.dev + '/assets/css/styles.css.map',
          sourceMapURL: opt.devTarget + '/assets/css/styles.css.map',
          sourceMapRootpath: opt.devTarget
        },
        files: {
          '<%=site.development%>/assets/css/styles.css' : opt.src + '/less/styles.less'
        }
      }
    },
    recess: {
      assets: { src: opt.src + '/*.less' }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      styles: {
        expand: true,
        flatten: true,
        src: '<%=site.development%>/assets/css/*.css',
        dest: '<%=site.development%>/assets/css/'
      },
    },

    /*
     * minify JS
     */
    uglify: {
      options: { banner: banner('Primary JS components') },
      assets: {
        files: [{ 
            cwd: opt.src + '/js/page-specific/',
            src: '**/*.js',
            dest:  opt.dev + '/assets/js/page-specific',
            flatten: true,
            expand: true
        }]
      },
      ie: {
        options: { banner: banner('Provides IE 8 support when needed') },
        files: {
          '<%=site.development%>/assets/js/ie.js': [
            opt.vendor + '/html5shiv/dist/html5shiv.js',
            opt.vendor + '/respond/src/respond.js'
          ]
        }
      }
    },

    /*
     * compress files
     */
    compress: {
      options: {
        mode: 'gzip',
        level: 9
      },
      styles: {
        expand: true,
        cwd: '<%=site.development%>/assets/',
        dest: '<%=site.production%>/assets/',
        src: ['**/*.css'],
        ext: '.css'
      },
      scripts: {
        expand: true,
        cwd: '<%=site.development%>/assets/',
        dest: '<%=site.production%>/assets/',
        src: ['**/*.js'],
        ext: '.js'
      },
      content: {
        expand: true,
        cwd: '<%=site.development%>/',
        dest: '<%=site.production%>/',
        src: ['**/*.html'],
        ext: '.html'
      },
      fonts: {
        expand: true,
        cwd: '<%=site.development%>/',
        src: ['assets/css/fonts/**/*'],
        dest: '<%=site.production%>/'
      }
    },

    /*
     * Assemble the site.
     */
    assemble: {
      options: {
        flatten: true,
        data: ['<%=site.source%>/data/*.{json,yml}', 'package.json'],
        plugins: [
          'assemble-contrib-permalinks'
        ],
        helpers: [
          'handlebars-helper-compose',
          'handlebars-helper-moment',
          'handlebars-helper-inarray',
          './tpl/helpers/*.js' // Custom helpers
        ],
        assets: '<%=site.development%>/assets',
        partials: [opt.tpl + '/partials/**/*.{hbs,md}', opt.tpl + '/svgs/**/*.{hbs,md}'],
        layoutdir: opt.tpl + '/layouts',
        layout: 'default.hbs',
        collections: [
          {
            name: 'post',
            sortby: 'date',
            sortorder: 'descending',
            pages: [opt.posts]
          }
        ],
        marked: {
          highlight: function (code, lang) {
            if (lang === undefined) lang = 'bash';
            if (lang === 'js') lang = 'javascript';
            if (lang === 'less') lang = 'scss';
            return hljs.highlight(lang, code).value;
          }
        },
        permalinks: {
          structure: ':basename/index.html'
        },
        compose: {
          cwd: opt.posts
        }
      },

      pages: {
        files: [
          {
            src: opt.pages + '/*.{hbs,md}',
            dest: opt.dev + '/'
          },
          {
            src: opt.pages + '/work/*.{hbs,md}',
            dest: opt.dev + '/work/'
          }
        ]
      },

      posts: {
        options: {
          layout: 'layout-post.hbs',
          permalinks: {
            structure: ':year/:basename/index.html'
          },
          feed: {
            debug: true,
            prettify: true,
            dest: 'rss.xml'
          },
          wordcount: { selector: '.article-content' }
        },
        files: [
          {
            src: opt.posts + '/**/*.{hbs,md}',
            dest: opt.dev + '/'
          },
          {
            src: opt.pages + '/index.hbs',
            dest: opt.dev + '/index.html'
          }
        ]
      },
      
    },

    /*
     * assemble sitemap, humans.txt, and robots.txt
     */
    sitemap: {
      production: {
        siteRoot: opt.prod,
        homepage: '<%=pkg.url%>'
      }
    },
    humans_txt: {
      options: {
        commentStyle: 'u', // # Unix style comments
        content: grunt.file.readJSON('humans.txt.json')
      },
      production: {
        dest: opt.prod + '/humans.txt'
      }
    },
    robotstxt: {
      production: {
        dest: opt.prod,
        policy: [
          { ua: 'googlebot', disallow: '/assets/' },
          { sitemap: ['<%=site.url%>/sitemap.xml'] },
          { crawldelay: 100 },
          { host: '<%=site.url%>' }
        ]
      }
    },

    /*
    * Watch files for changes
    */
    watch: {
      options: {
        spawn: false,
        interrupt: true,
        livereload: true
      },
      all: {
        files: [
          opt.src + '/**/*.{less,js,json,yml}',
          opt.tpl + '/**/*.{html,hbs,md}',
          opt.posts + '/**/*.{hbs,md}',
          opt.pages + '/**/*.{hbs,md}',
          opt.projects + '/**/*.{hbs,md}'
        ],
        tasks: ['styles','scripts','assemble']
      },
      styles: {
        files: [
          opt.src + '/**/*.{less,js,json,yml}',
          opt.tpl + '/**/*.{html,hbs,md}',
          opt.posts + '/**/*.{hbs,md}',
          opt.pages + '/**/*.{hbs,md}',
          opt.projects + '/**/*.{hbs,md}'
        ],
        tasks: ['styles']
      },
      content: {
         files: [
           './pages/**/*.{hbs,md}'
        ],
        tasks: ['assemble']
      }
    },

    /*
    * Start local server
    */
    connect: {
      dev: {
        options: {
          hostname: opt.devHostname,
          port: opt.devPort,
          open: {
            target: devTarget,
            appName: 'chrome'
          },
          base: opt.dev
        }
      }
    }

  });

  /*
   * I could use: https://www.npmjs.org/package/load-grunt-tasks,
   * but it slows down exectution on larger tasks where time is 
   * important.
   */ 
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-humans-txt');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-robots-txt');
  grunt.loadNpmTasks('grunt-sitemap');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-browserify');
  
  /**
   * Grunt CLI Tasks:
   * 
   * test: Test LESS against Recess library
   * clean: delete all code compiled by Grunt
   * styles: Compile LESS to CSS and add vendor prefixes
   * scripts: Concatenate JS
   * content: Assemble HTML
   * assets: Copy images, fonts, etc. 
   *
   * dev:
   *   - dev:styles will watch only LESS source code
   *   - dev:scripts will watch only JS source code
   *   - dev:content will watch content source files and data, 
   *     e.g., hbs templates, Markdown, or JSON.
   *   - dev:all will watch all source code
   *   - If the "--serve" option is added, a connect 
   *     web server will run at localhost:8000
   */
  grunt.registerTask('default', ['ftp-deploy']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('test', ['recess']); 
  grunt.registerTask('styles', ['less','autoprefixer']); 
  grunt.registerTask('scripts', ['uglify']);
  grunt.registerTask('content', ['assemble','humans_txt','robotstxt']);
  grunt.registerTask('assets', ['copy']);
  grunt.registerTask('prep-ftp', ['clean','copy','content','styles','scripts','assets','compress']);
    
grunt.registerTask('ftp', 'A sample task that logs stuff.', function(arg1) {
  if (arguments.length === 0) {
    grunt.log.writeln(this.name + ", no args");
  } else {
    grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
  }
});
  
  grunt.registerTask('dev', 'Grunt enters dev mode and watches source files for changes.', function(n) {
    
    /**
     * This task would be considered "dynamic".
     * Documentation: http://gruntjs.com/frequently-asked-questions#dynamic-alias-tasks
     */
    
    var option = {
      connect: grunt.option('serve') // http://gruntjs.com/frequently-asked-questions#options
    };
  
    if (n == null) {
      grunt.warn('Watch type must be specified, like watch:all or watch:styles.');
    } else if (n != null && option.connect == true) {
      grunt.task.run('connect','watch:' + n);
    } else {
      grunt.task.run('watch:' + n); 
    };
    
  });
  
  grunt.registerTask('build', ['content','styles','scripts','assets','compress']);

}
