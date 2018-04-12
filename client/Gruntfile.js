var path = require('path');
var dst = path.join(__dirname, '..', 'public', 'static');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      main: {
        src: ['node_modules/jquery/dist/jquery.min.js', 'node_modules/chart.js/dist/Chart.min.js'],
        dest: path.join(dst,'js','vendor.js')
      }
    },

    sass: {
      main: {
        options: {
          style: 'expanded'
        },
        files: {
          [path.join(dst,'css','nimbusec.css')] : 'sass/nimbusec.sass'
        }
      }
    },

    watch: {
      sass: {
        files: ['sass/**'],
        tasks: ['sass'],
      }
    },

    concurrent: {
      watch: {
        tasks: ['watch:sass'],
        options: {
          logConcurrentOutput: true,
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['sass:main','concat:main']);
  grunt.registerTask('dev', ['concurrent:watch']);
}
