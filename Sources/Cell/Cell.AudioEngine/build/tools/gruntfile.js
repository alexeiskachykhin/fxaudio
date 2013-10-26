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
                main: grunt.file.readJSON('../fragments/source-reference.json'),
                test: grunt.file.readJSON('../fragments/test-reference.json'),
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

        exists: {
            dev: {
                files: ['<%= manifest.sources.main %>']
            },

            test: {
                files: ['<%= manifest.sources.test %>']
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
                files: ['<%= manifest.sources.main %>']
            },

            test: {
                files: ['<%= manifest.sources.test %>']
            }
        },

        ts: {
            options: {
                target: 'es5',
                module: 'amd',
                declaration: true
            },

            dev: {
                src: ['<%= manifest.sources.main %>', '<%= manifest.sources.libraries %>'],
                out: '<%= manifest.outputPath %>/fxAudio.js',
                reference: '<%= manifest.sourcePath %>/_references.ts'
            },

            test: {
                src: ['<%= manifest.sources.test %>'],
                out: '<%= manifest.outputPath %>/fxTest.js'
            }
        },

        connect: {
            dev: {
                options: {
                    base: ['<%= manifest.rootPath %>'],
                    open: true,
                    keepalive: true
                }
            }
        }
    });


    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');


    grunt.registerTask('pre-build', ['clean:dev', 'template:dev', 'exists']);
    grunt.registerTask('lint', ['jsonlint:dev', 'jshint:dev', 'tslint']);
    grunt.registerTask('compile', ['ts']);
    grunt.registerTask('test', ['connect:dev']);

    grunt.registerTask('default', ['pre-build', 'lint', 'compile', 'test']);

    //grunt.registerTask('default', ['clean:dev', 'template:dev', 'exists:dev', 'jsonlint:dev', 'jshint:dev', 'tslint:dev', 'connect:dev', 'ts:dev']);
    //grunt.registerTask('test', ['exists:test', 'tslint:test', 'ts:test']);
};