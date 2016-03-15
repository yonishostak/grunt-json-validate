/*
 * grunt-jsonvalidate
 * https://github.com/yonishostak/grunt-json-validate
 *
 * Copyright (c) 2015 Yoni Shostak
 * Licensed under the MIT license
 */

module.exports = function(grunt) {
    // register a multitask
    grunt.registerMultiTask('jsonvalidate', 'Validate JSON files with jsonschema', function() {
        var JSONSchema = require('jsonschema');
        var _ = require('underscore');

        // global options
        var globalOptions = this.options();

        // load referenced schemas
        this.files.forEach(function(file) {
            // each group has it's on validator instance
            var validator = new JSONSchema.Validator();
            var localOptions = file.options;

            // apply default options, add/override with local options
            var options = {};
            _.extend(options, globalOptions || {}, localOptions || {});

            // load main (root) schema
            var rootSchema = grunt.file.readJSON(file.schema);
            grunt.log.subhead('Applying root schema: ' + file.schema);

            // load referenced schemas, expand each glob pattern
            file.refs.forEach(function(pattern) {
                var schemas = grunt.file.expand(pattern);
                // load all schemas in the set
                schemas.forEach(function(schemaFile) {
                    if(schemaFile != file.schema) {
                        var schema = grunt.file.readJSON(schemaFile);
                        if(!schema.id) {
                            grunt.log.error('Schema ' + schemaFile + 'has no "id" property, skipping');
                        } else {
                            validator.addSchema(schema, schema.id);
                            grunt.log.writeln('Applying referenced schema ' + schemaFile + ' for id ' + schema.id);
                        }
                    }
                });
            });

            // validate files
            file.src.forEach(function(file) {
                var json = grunt.file.readJSON(file);
                var result = validator.validate(json, rootSchema, options);
                if(result.errors.length > 0) {
                    grunt.log.subhead(file);
                    result.errors.forEach(function(error) {
                        this.errorCount++;
                        grunt.log.errorlns([error.property, error.message].join(' '));
                    });
                    grunt.log.writeln();
                } else {
                    grunt.log.oklns(file);
                }
            });
        });

        // were there errors?
        if(this.errorCount) {
            grunt.event.emit('jsonvalidate.fail');
            return false;
        }

        grunt.event.emit('jsonvalidate.ok');
        grunt.log.ok();
        return true;
    });
};
