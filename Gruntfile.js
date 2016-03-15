module.exports = function(grunt) {

    // Tasks configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'test/**/*.js',
                'test/**/*.json'
            ]
        },
        jsonvalidate: {
            target: {
                options: { },
                files: [
                    {
                        options: { },
                        schema: 'test/schemas/test.schema.json',
                        refs: [
                            'test/schemas/**/*.schema.json'
                        ],
                        src: 'test/json/**/*.json'
                    }
                ]
            }
        },
        nodeunit: {
            tests: [ 'test/*.test.js' ],
            options: {
                reporter : 'default'
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    // including our own tasks
    grunt.loadTasks('./tasks');

    // Default task(s)
    grunt.registerTask('default', ['jshint', 'nodeunit']);
};
