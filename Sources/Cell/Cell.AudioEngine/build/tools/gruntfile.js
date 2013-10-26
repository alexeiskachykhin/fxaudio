module.exports = function (grunt) {
    'use strict';


    grunt.initConfig({

        manifest: {
            rootPath: '../..',
            sourcePath: '<%= manifest.rootPath %>/sources',
            resourcePath: '<%= manifest.sourcePath %>/resources',
            testPath: '<%= manifest.rootPath %>/tests/nova',
            outputPath: '<%= manifest.rootPath %>/build/output',

            sources: {
                main: grunt.file.readJSON('../fragments/source-reference.json'),
                test: grunt.file.readJSON('../fragments/test-reference.json'),
                
                libraries: ['../../libraries/**/*.d.ts']
            },

            resources: grunt.file.readJSON('../../sources/resources/resources.json'),
            testCases: grunt.file.expand({ cwd: '../../tests/nova' }, '*.json')
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
            dev: {
                options: {
                    data: '<%= manifest.resources %>',
                },

                files: {
                    '<%= manifest.resourcePath %>/resources.generated.ts': ['<%= manifest.resourcePath %>/resources.tst']
                }
            },

            test: {
                options: {
                    data: {
                        files: '<%= manifest.testCases %>'
                    }
                },

                files: {
                    '<%= manifest.testPath %>/runner.generated.html': ['<%= manifest.testPath %>/runner.htmlt']
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
                src: ['<%= manifest.sources.test %>', '<%= manifest.outputPath %>/fxAudio.d.ts'],
                out: '<%= manifest.outputPath %>/fxTest.js',
                reference: '<%= manifest.sourcePath %>/test/_references.ts'
            }
        },

        watch: {
            sources: {
                files: ['<%= manifest.sources.main %>', '<%= manifest.sources.test %>'],
                tasks: ['compile']
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


    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('pre-build', ['clean:dev', 'template:*', 'exists:*']);
    grunt.registerTask('lint', ['jsonlint:dev', 'jshint:dev', 'tslint:*']);
    grunt.registerTask('compile', ['ts:*']);
    grunt.registerTask('test', ['connect:dev']);
    grunt.registerTask('post-build', ['watch']);

    grunt.registerTask('default', ['pre-build', 'lint', 'compile', 'test', 'post-build']);
};