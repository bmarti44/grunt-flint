/*jslint devel: false, browser: false, node: true, maxerr: 50, indent: 2, white: true*/
/*global console: false, clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

/*
 * grunt-flint
 * https://github.com/bmarti44/grunt-flint
 *
 * Copyright (c) 2014 Brian Martin
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('flint', 'Uses regular expressions to fail or pass files', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    
    var globs = [],
      patterns = grunt.file.readJSON('.flintrc'),
      files,
      i,
      s,
      x,
      src,
      lines;
    
    this.files.forEach(function(glob) {
      globs.push(glob.src);
    });
    
    files = grunt.file.expand(globs);
    
    for (i = 0; i < files.length; i += 1) {
      
      if (grunt.file.exists(files[i])) {
        
        src = grunt.file.read(files[i]);
        
        if (typeof(patterns[this.target]) !== 'undefined' && util.isArray(patterns[this.target]) && patterns[this.target].length) {
          
          for (s = 0; s < patterns[this.target].length; s += 1) {
            
            lines = src.split(/\n/);
            
            for (x = 0; x < lines.length; x += 1) {
              if (lines[x].match(new RegExp(patterns[this.target][s]))) {
                grunt.log.error('Failed regular expression "' + patterns[this.target][s] + '" on line ' + (x + 1));
                
              }
            }
          }
          grunt.log.ok('File ' + files[i] + ' passed!');
        }
      }
    }
    
  });

};
