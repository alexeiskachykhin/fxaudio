module.exports = function (grunt) {
    'use strict';


    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-tslint');


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
                src: ['../../sources/**/*.ts', '../../libraries/**/*.d.ts'],
                watch: '../../sources',
                out: '../output/fxAudio.js',
                reference: '../../sources/_references.ts'
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },

            dev: {
                src: ['../../sources/**/*.ts']
            }
        }
    });


    grunt.registerTask('default', ['clean:dev', 'tslint:dev', 'ts:dev']);
}