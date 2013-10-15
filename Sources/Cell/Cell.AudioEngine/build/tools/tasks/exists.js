module.exports = function (grunt) {
    'use strict';


    var flatten = function (collection) {
        var items = [];

        collection.forEach(function (innerCollection) {
            innerCollection.forEach(function (item) {
                items.push(item);
            });
        });

        return items;
    };


    grunt.registerMultiTask('exists', 'Ensures that specified files exist.', function () {
        grunt.log.writeln('Checking files for existence...');


        var files = flatten(this.data.files);

        var filesExist = files.every(function (file) {
            grunt.verbose.write('Checking file: ');
            grunt.verbose.subhead(file);

            var fileExists = grunt.file.exists(file);

            if (!fileExists) {
                grunt.log.write(file)
                grunt.log.error('doesn`t exists!');
            }

            return fileExists;
        });


        if (filesExist) {
            grunt.log.ok();
        }

        return filesExist;
    });
};