module.exports = function (grunt) {
    'use strict';

    const path = require('path');


    grunt.initConfig({

        manifest: {
            sourcePath: 'sources',
            resourcePath: 'sources/resources',
            testPath: 'tests',
            outputPath: path.dirname(grunt.file.readJSON('tsconfig.json').compilerOptions.outFile),

            sources: grunt.file.readJSON('tsconfig.json').files,
            resources: grunt.file.readJSON('sources/resources/resources.json')
        },



        clean: {
            options: {
                force: true
            },

            dev: [
                '<%= manifest.sourcePath %>/**/*.generated.ts',
                '<%= manifest.outputPath %>/*'
            ]
        },

        template: {
            options: {
                data: '<%= manifest.resources %>',
            },

            dev: {
                files: {
                    '<%= manifest.resourcePath %>/resources.generated.ts': ['<%= manifest.resourcePath %>/resources.tst']
                }
            }
        },

        fileExists: {
            dev: ['<%= manifest.sources %>']
        },

        jsonlint: {
            dev: {
                src: ['.jshintrc', '.tslintrc', '*.json', '<%= manifest.sourcePath %>/**/*.json', '<%= manifest.resourcePath %>/**/*.json']
            }
        },

        jshint: {
            options: {
                jshintrc : '.jshintrc'
            },

            dev: {
                src: ['gruntfile.js', '<%= manifest.testPath %>']
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON('.tslintrc')
            },

            dev: {
                src: '<%= manifest.sources %>',
                filter: file => !file.endsWith('.d.ts')
            }
        },

        ts: {
            dev: {
                tsconfig: true,
                watch: '<%= manifest.sourcePath %>',
                reference: '<%= manifest.sourcePath %>/_references.ts'
            }
        },

        connect: {
            dev: {}
        }
    });


    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.loadNpmTasks('grunt-file-exists');


    grunt.registerTask('default', ['clean:dev', 'template:dev', 'fileExists:dev', 'jsonlint:dev', 'jshint:dev', 'tslint:dev', 'connect:dev', 'ts:dev']);
};