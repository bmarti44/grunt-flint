/*jslint devel: false, browser: false, node: true, maxerr: 50, indent: 4, white: true*/
/*global console: false, clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

/*
 * grunt-flint
 * https://github.com/bmarti44/grunt-flint
 *
 * Copyright (c) 2014 Brian Martin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('flint', 'Uses regular expressions to fail or pass files', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    grunt.log.writeln(JSON.stringify(this.files));
    
    var globs = [],
      files,
      i,
      src;
    
    this.files.forEach(function(glob) {
      globs.push(glob.src);
    });
    
    files = grunt.file.expand(globs);
    
    for (i = 0; i < files.length; i += 1) {
      if (grunt.file.exists(files[i])) {
        src = grunt.file.read(files[i]);
        grunt.log.writeln(src);
      }
    }
    
  });

};
