module.exports = function (grunt) {

  var compiledAssetsDir = '.compiled';

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    clean: {
      files: compiledAssetsDir
    },
    babel: {
      options: {
        sourceMap: true,
        experimental: true,
        modules: "ignore"
      },
      compile: {
        files: [{
          expand: true,
          src: ["app/**/*.js"],
          dest: compiledAssetsDir,
          ext: ".js"
        }]
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ["app/**/**.js", "app/**/**.styl"],
      tasks: ['stylus', 'babel'],
      options: {
        spawn: false
      }
    },
    connect: {
      server: {
        options: {
          base: [compiledAssetsDir, './'],
          debug: true,
          keepalive: false // The watch task will keep the server alive.
          // Once we kill the watch service the server will stop.
        }
      }
    },
    stylus: {
      compile: {
        options: {
          // relativeDest: '.compiled/'
        },
        files: [{
          expand: true,
          src: ["app/**/*.styl"],
          dest: compiledAssetsDir,
          ext: ".css"
        }]
      },
    },
    wiredep: {
      task: {
        src: [
          'index.html',
          'app/views/**/*.html', // .html support...
          'app/views/**/*.jade', // .jade support...
          'app/styles/main.scss', // .scss & .sass support...
          'app/config.yml' // and .yml & .yaml support out of the box!
        ],
      }
    }
  });

  grunt.registerTask('compile', ['babel', 'stylus'])
  grunt.registerTask('serve', ['compile', 'connect', 'watch'])
  grunt.registerTask('default', ['serve']);
};
