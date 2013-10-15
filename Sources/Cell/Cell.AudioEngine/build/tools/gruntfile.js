module.exports = function (grunt) {
    'use strict';


    grunt.initConfig({

        manifest: {
            rootPath: '../..',
            sourcePath: '<%= manifest.rootPath %>/sources',
            resourcePath: '<%= manifest.sourcePath %>/resources',
            testPath: '<%= manifest.rootPath %>/tests',
            outputPath: '<%= manifest.rootPath %>/build/output',

            sources: {
                ts: grunt.file.readJSON('../fragments/source-reference.json'),
                libraries: ['../../libraries/**/*.d.ts']
            },

            resources: grunt.file.readJSON('../../sources/resources/resources.json')
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

        jsonlint: {
            dev: {
                src: ['.jshintrc', '.tslintrc', '*.json', '../fragments/*.json', '<%= manifest.resourcePath %>/**/*.json']
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
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');


    grunt.registerTask('default', ['clean:dev', 'template:dev', 'jsonlint:dev', 'jshint:dev', 'tslint:dev', 'connect:dev', 'ts:dev']);
};