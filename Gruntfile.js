module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      ts: {
          options: {
            removeComments: false,
          },
          default: {
              src: ['ts/**/*.ts'],
              out: 'ImprovedInitiative.js',
              options: {
                  module: 'amd',
                  target: 'es5'
              }
          },
          server : {
              src: ['server/**/*.ts'],
              outDir: '.',
              options: {
                  module: 'commonjs',
                  target: 'es5'
              }
          },
          test: {
              src: ['test/**/*.ts'],
              out: 'test.js',
              options: {
                  module: 'commonjs',
                  target: 'es5'
              }
          }
      },
      less: {
        development: {
          options: {
            paths: ["."]
          },
          files: {
            "public/css/tracker.css": "tracker.less"
          }
        }
      },
      concat: {
        js: {
          src: [
            'node_modules/knockout/build/output/knockout-latest.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/mousetrap/mousetrap.js',
            'node_modules/socket.io-client/socket.io.js',
            'node_modules/browser-filesaver/FileSaver.js',
            'ImprovedInitiative.js'
          ],
          dest: 'public/js/ImprovedInitiative.js'
        }
      },
      watch: {
        ts: {
          files: '**/*.ts',
          tasks: ['ts']
        },
        lesscss: {
          files: '**/*.less',
          tasks: ['less']
        }
      }
  });

  grunt.registerTask('default', ['ts:default', 'ts:server', 'less', 'concat']);
  grunt.registerTask('test', ['ts:test']);
};