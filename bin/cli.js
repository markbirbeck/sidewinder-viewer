#!/usr/bin/env node
'use strict';

const path = require('path');
const spawn = require('child_process').spawn;

/**
 * Act as if the command has been run like this in the parent directory:
 *
 *  electron . http://inbox.google.com#meta(height=300)
 */

const electron = require('electron');
let parent = path.resolve(__dirname, '..');

spawn(
  electron,
  [
    parent,
    ...process.argv.slice(2)
  ],
  {stdio: 'inherit'}
);
