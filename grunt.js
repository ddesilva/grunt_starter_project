module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-less');

  grunt.initConfig({

    // Load project information for package.json
    pkg: '<json:package.json>',

    // Project meta data

    lint: {
      all: [
        'grunt.js', 
        'js/main.js'
      ]
    },

     concat : {
      release : {
        src : '<file_strip_banner:build/tmp/main.js:block>',
        dest : 'js/main-min.js'
      } 
    },


    less : {
      release : {
        src : 'css/styles.less',
        dest: 'css/styles.css',
        options: {
          compress: true
        }
      }
    },
    
    requirejs: {

      baseUrl: "js",
      paths : { // lets the compiler know what dependent files to grab.
        'ajax-content-loader' : 'modules/ajax-content-loader',
        'helper-functions'    : 'modules/helper-functions',
        'youtube-helper'      : 'modules/youtube-helper',
        'sea-animation'       : 'modules/sea-animation',
        'order'               : 'lib/order',
        'config-pages'        : 'pages',
        'scrollorama'         : 'lib/jquery.scrollorama'
      },
      name: "main",
      out: "build/tmp/main.js"
            
    }
  });

  
  // Default task.
  grunt.registerTask('default', 'requirejs:js concat:release less:release');

};