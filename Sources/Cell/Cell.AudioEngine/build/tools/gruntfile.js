module.exports = function (grunt) {
    'use strict';


    grunt.initConfig({

        sourcePath: '../../sources',

        outputPath: '../output',


        sources: {
            ts: grunt.file.readJSON('../fragments/source-reference.json'),
            libraries: ['../../libraries/**/*.d.ts']
        },



        clean: {
            options: {
                force: true
            },

            dev: [
                '<%= sourcePath %>/**/*.js',
                '<%= sourcePath %>/**/*.map',
                '<%= outputPath %>/*'
            ]
        },

        ts: {
            options: {
                target: 'es5',
                module: 'amd',
                declaration: true
            },

            dev: {
                src: ['<%= sources.ts %>', '<%= sources.libraries %>'],
                watch: '<%= sourcePath %>',
                out: '<%= outputPath %>/fxAudio.js',
                reference: '<%= sourcePath %>/_references.ts'
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },

            dev: {
                files: ['<%= sources.ts %>']
            }
        }
    });


    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-tslint');


    grunt.registerTask('default', ['clean:dev', 'tslint:dev', 'ts:dev']);
}