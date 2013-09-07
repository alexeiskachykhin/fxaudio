module.exports = function (grunt) {
    'use strict';


    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.initConfig({

        clean: {
            options: {
                force: true
            },

            dev: [
                '../../sources/**/*.js',
                '../../sources/**/*.map',
                '../output/*'
            ]
        },

        ts: {
            options: {
                target: 'es5',
                module: 'amd',
                declaration: true
            },

            dev: {
                src: ['../../sources/**/*.ts'],
                watch: '../../sources',
                out: '../output/fxAudio.js'
            },


        }
    });


    grunt.registerTask('default', ['clean:dev', 'ts:dev']);
}