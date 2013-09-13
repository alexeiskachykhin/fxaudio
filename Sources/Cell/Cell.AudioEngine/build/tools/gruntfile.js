module.exports = function (grunt) {
    'use strict';


    grunt.initConfig({

        manifest: {
            rootPath: '../..',
            sourcePath: '<%= manifest.rootPath %>/sources',
            outputPath: '<%= manifest.rootPath %>/build/output',

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

        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },

            dev: {
                files: ['<%= manifest.sources.ts %>']
            }
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

        connect: {
            dev: {
                options: {
                    base: ['<%= manifest.rootPath %>'],
                    open: true
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');


    grunt.registerTask('default', ['clean:dev', 'tslint:dev', 'connect:dev', 'ts:dev']);
}