module.exports = function (grunt) {
    'use strict';


    grunt.initConfig({

        manifest: {
            sourcePath: '../../sources',
            outputPath: '../output',

            sources: {
                ts: grunt.file.readJSON('../fragments/source-reference.json'),
                libraries: ['../../libraries/**/*.d.ts']
            }
        },


        clean: {
            options: {
                force: true
            },

            dev: [
                '<%= manifest.sourcePath %>/**/*.js',
                '<%= manifest.sourcePath %>/**/*.map',
                '<%= manifest.outputPath %>/*'
            ]
        },

        ts: {
            options: {
                target: 'es5',
                module: 'amd',
                declaration: true
            },

            dev: {
                src: ['<%= manifest.sources.ts %>', '<%= manifest.sources.libraries %>'],
                watch: '<%= manifest.sourcePath %>',
                out: '<%= manifest.outputPath %>/fxAudio.js',
                reference: '<%= manifest.sourcePath %>/_references.ts'
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },

            dev: {
                files: ['<%= manifest.sources.ts %>']
            }
        }
    });


    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-tslint');


    grunt.registerTask('default', ['clean:dev', 'tslint:dev', 'ts:dev']);
}