module.exports = function(grunt) {
    grunt.initConfig({

        // note that all paths are now relative to the location of this gruntfile

        jsonvalidate: {
            pass: {
                options: { },
                files: [
                    {
                        options: { },
                        schema: 'schemas/test.schema.json',
                        refs: [
                            'schemas/**/*.schema.json'
                        ],
                        src: 'json/valid.json'
                    }
                ]
            },
            fail: {
                options: { },
                files: [
                    {
                        options: { },
                        schema: 'test/schemas/test.schema.json',
                        refs: [
                            'test/schemas/**/*.schema.json'
                        ],
                        src: 'test/json/invalid.json'
                    }
                ]
            },
            misconfig: {
                options: { },
                files: [
                    {
                        options: { },
                        schema: 'test/schemas/idontexist.schema.json',
                        refs: [
                            'test/schemas/**/*.schema.json'
                        ],
                        src: 'test/json/**/*.json'
                    }
                ]
            },
        }
    });

    grunt.loadTasks('./../tasks');
};
