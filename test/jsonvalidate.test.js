var exec = require("child_process").exec;

function execGrunt(filename, task, callback) {
    var command = 'grunt --gruntfile ' + filename + ' --no-color --verbose "' + task + '"';
    var options = { cwd: 'test/' };
    exec(command, options, callback);
}

function contains(where, what) {
    return -1 < where.toString().indexOf(what);
}

module.exports = {

    test_pass: function(test) {
        test.expect(3);
        execGrunt('test-gruntfile.js', 'jsonvalidate:pass', function(error, stdout, stderr) {
            test.equal(error, null, 'Test should not fail catastrophically');
            test.equal(stderr, '', 'stderr should be empty');
            var hasErrors = contains(stdout, 'Aborted due to warnings');
            test.ok(!hasErrors, 'Grunt errors in stdout');
            test.done();
        });
    },

    test_fail: function(test) {
        test.expect(3);
        execGrunt('test-gruntfile.js', 'jsonvalidate:fail', function(error, stdout, stderr) {
            test.notEqual(error, null, 'Validation should fail');
            test.equal(stderr, '', 'stderr should be empty');
            var hasErrors = contains(stdout, 'Aborted due to warnings');
            test.ok(hasErrors, 'Grunt errors in stdout');
            test.done();
        });
    },

    test_misconfig: function(test) {
        test.expect(3);
        execGrunt('test-gruntfile.js', 'jsonvalidate:misconfig', function(error, stdout, stderr) {
            test.notEqual(error, null, 'Validation should fail');
            test.equal(stderr, '', 'stderr should be empty');
            var hasErrors = contains(stdout, 'Aborted due to warnings');
            test.ok(hasErrors, 'Grunt errors in stdout');
            test.done();
        });
    }

};

