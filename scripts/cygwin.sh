#!/bin/bash
# on my winpc with cygwin grunt-jsdoc not working so do by hand
grunt windows

echo " "
echo Run tests
#mocha --reporter nyan test/
mocha --reporter spec test/

echo " "
echo Create jsdoc documentation
rm -rf doc
jsdoc --configure 'jsdoc.conf.json' --destination doc --recurse test/ lib/ Gruntfile.js README.md

echo Done
